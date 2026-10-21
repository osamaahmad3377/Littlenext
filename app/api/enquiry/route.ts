import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const MAX = { short: 120, email: 160, phone: 40, message: 4000 };

type Body = Record<string, unknown>;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
// Header values must be single-line
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

// Best-effort per-instance rate limit (5 enquiries per IP per 10 minutes)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet: the form falls back to opening the visitor's email app
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const d = {
    mode: str(body.mode, MAX.short),
    category: str(body.category, MAX.short),
    from: str(body.from, MAX.short),
    to: str(body.to, MAX.short),
    quantity: str(body.quantity, MAX.short),
    message: str(body.message, MAX.message),
    name: str(body.name, MAX.short),
    company: str(body.company, MAX.short),
    email: str(body.email, MAX.email),
    phone: str(body.phone, MAX.phone),
  };
  if (!d.name || !d.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Trade type", d.mode || "Not specified"],
    ["Category", d.category || "Not specified"],
    ["Route", `${d.from || "Not specified"} → ${d.to || "Not specified"}`],
    ["Quantity", d.quantity || "Not specified"],
    ["Name", d.name],
    ["Company", d.company || "Not provided"],
    ["Email", d.email],
    ["Phone", d.phone || "Not provided"],
  ];

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;color:#0f172a">
<h2 style="margin:0 0 16px">New website enquiry</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;width:130px"><b>${esc(k)}</b></td><td style="padding:8px 12px;border:1px solid #e2e8f0">${esc(v)}</td></tr>`)
    .join("")}</table>
<h3 style="margin:20px 0 8px">Requirement</h3>
<p style="white-space:pre-wrap;margin:0">${esc(d.message)}</p>
<p style="margin-top:24px;color:#64748b;font-size:13px">Reply to this email to respond to ${esc(d.name)} directly.</p></div>`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Requirement:", d.message].join("\n");

  const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `${site.name} Website <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL || site.contact.email],
      reply_to: d.email,
      subject: oneLine(`${d.mode || "New"} enquiry: ${d.category || "General"} (${d.company || d.name})`),
      html,
      text,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error("Enquiry email failed", res?.status, res ? await res.text().catch(() => "") : "network error");
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
