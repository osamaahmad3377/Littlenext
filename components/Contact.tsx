"use client";

import { useEffect, useState } from "react";
import { divisions, site, tradeModes } from "@/lib/site";
import { ArrowRight, Chat, Check, Clock, Mail, Phone, Pin } from "./icons";
import { PREFILL_EVENT, type Prefill } from "./QuickQuote";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15";
const labelClass = "block text-sm font-medium text-slate-700";

const categories = [...divisions.map((d) => d.title), "Other products"];
const stepTitles = ["Requirement", "Your details", "Review"];

type Data = {
  mode: string;
  category: string;
  from: string;
  to: string;
  quantity: string;
  message: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

const empty: Data = {
  mode: tradeModes[0],
  category: categories[0],
  from: "",
  to: "",
  quantity: "",
  message: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        selected
          ? "border-night-950 bg-night-950 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
}

export function Contact() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [prefilled, setPrefilled] = useState(false);
  const [sent, setSent] = useState(false);
  const { contact } = site;

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  // Receive values from the hero quick-quote widget
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail;
      setData((d) => ({ ...d, ...p }));
      setStep(0);
      setSent(false);
      setPrefilled(true);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function next(e: React.FormEvent) {
    e.preventDefault();
    setStep((s) => Math.min(s + 1, 2));
  }

  // No backend yet: compose the enquiry in the visitor's email app.
  function send(e: React.FormEvent) {
    e.preventDefault();
    const subject = `${data.mode} enquiry: ${data.category} — ${data.company || data.name}`;
    const body = [
      `Trade type: ${data.mode}`,
      `Category: ${data.category}`,
      `Route: ${data.from || "—"} → ${data.to || "—"}`,
      `Quantity: ${data.quantity || "—"}`,
      "",
      data.message,
      "",
      `Name: ${data.name}`,
      `Company: ${data.company || "—"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const details = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    ...(contact.whatsapp
      ? [{ icon: Chat, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${contact.whatsapp}` }]
      : []),
    { icon: Pin, label: "Office", value: contact.address },
    { icon: Clock, label: "Hours", value: contact.hours },
  ];

  const review: [string, string][] = [
    ["Trade type", data.mode],
    ["Category", data.category],
    ["Route", `${data.from || "—"} → ${data.to || "—"}`],
    ["Quantity", data.quantity || "—"],
    ["Requirement", data.message],
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
  ];

  return (
    <section id="contact" className="bg-slate-50 py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal>
          <SectionLabel index="07">Contact</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-night-950 sm:text-6xl">
            Let&apos;s talk <span className="text-slate-400">trade.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Buying or selling, one shipment or a long-term contract — tell us what you need.
          </p>

          <ol className="mt-10 space-y-4">
            {["We review your requirement within one business day", "We share supplier options and a clear quotation", "You decide — no obligation"].map(
              (t, i) => (
                <li key={t} className="flex items-center gap-4 text-slate-700">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-mono text-xs text-electric-600 ring-1 ring-slate-200">
                    0{i + 1}
                  </span>
                  {t}
                </li>
              ),
            )}
          </ol>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {details.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-night-950 text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
                    <span className="block break-words text-sm font-semibold text-night-950">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`${cls} transition hover:border-electric-300 hover:shadow-lg hover:shadow-electric-500/5`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/[0.06] sm:p-10">
            {sent ? (
              <div className="flex min-h-[30rem] flex-col items-center justify-center text-center" role="status">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-electric-500 text-white shadow-lg shadow-electric-500/30">
                  <Check className="h-8 w-8" strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-night-950">Almost there</h3>
                <p className="mt-3 max-w-sm text-slate-600">
                  Your email app should have opened with your enquiry ready to send. If it didn&apos;t, write to us at{" "}
                  <a href={`mailto:${contact.email}`} className="font-semibold text-night-950 underline">
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setStep(0);
                    setData(empty);
                    setPrefilled(false);
                  }}
                  className="mt-8 rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-night-950 hover:bg-slate-50"
                >
                  Start a new enquiry
                </button>
              </div>
            ) : (
              <>
                {/* Stepper */}
                <ol className="grid grid-cols-3 gap-3" aria-label="Form progress">
                  {stepTitles.map((t, i) => (
                    <li key={t} aria-current={i === step ? "step" : undefined}>
                      <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-electric-500" : "bg-slate-200"}`} />
                      <span className={`mt-2.5 block font-mono text-[11px] uppercase tracking-wider ${i <= step ? "text-night-950" : "text-slate-400"}`}>
                        0{i + 1} · {t}
                      </span>
                    </li>
                  ))}
                </ol>

                {prefilled && step === 0 && (
                  <p className="mt-6 flex items-center gap-2 rounded-xl bg-electric-500/10 px-4 py-3 text-sm text-electric-600">
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                    We&apos;ve added the details from your quick enquiry.
                  </p>
                )}

                {step === 0 && (
                  <form onSubmit={next} className="mt-8 space-y-6">
                    <fieldset>
                      <legend className={labelClass}>I want to</legend>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {tradeModes.map((m) => (
                          <Chip key={m} selected={data.mode === m} onClick={() => setData((d) => ({ ...d, mode: m }))}>
                            {m}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className={labelClass}>Category</legend>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {categories.map((c) => (
                          <Chip key={c} selected={data.category === c} onClick={() => setData((d) => ({ ...d, category: c }))}>
                            {c}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>
                    <div className="grid gap-5 sm:grid-cols-3">
                      <label className={labelClass}>
                        From
                        <input value={data.from} onChange={set("from")} className={fieldClass} placeholder="Origin country" />
                      </label>
                      <label className={labelClass}>
                        To
                        <input value={data.to} onChange={set("to")} className={fieldClass} placeholder="Destination" />
                      </label>
                      <label className={labelClass}>
                        Quantity
                        <input value={data.quantity} onChange={set("quantity")} className={fieldClass} placeholder="e.g. 2 × 40ft" />
                      </label>
                    </div>
                    <label className={labelClass}>
                      Your requirement *
                      <textarea
                        required
                        rows={4}
                        value={data.message}
                        onChange={set("message")}
                        className={`${fieldClass} resize-y`}
                        placeholder="Product, specification, packaging, timeline…"
                      />
                    </label>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-night-950 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}

                {step === 1 && (
                  <form onSubmit={next} className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      Full name *
                      <input required autoComplete="name" value={data.name} onChange={set("name")} className={fieldClass} placeholder="Jane Smith" />
                    </label>
                    <label className={labelClass}>
                      Company
                      <input autoComplete="organization" value={data.company} onChange={set("company")} className={fieldClass} placeholder="Company Ltd." />
                    </label>
                    <label className={labelClass}>
                      Email *
                      <input required type="email" autoComplete="email" value={data.email} onChange={set("email")} className={fieldClass} placeholder="you@company.com" />
                    </label>
                    <label className={labelClass}>
                      Phone / WhatsApp
                      <input type="tel" autoComplete="tel" value={data.phone} onChange={set("phone")} className={fieldClass} placeholder="+1 555 000 0000" />
                    </label>
                    <div className="flex items-center justify-between sm:col-span-2">
                      <button type="button" onClick={() => setStep(0)} className="rounded-full px-5 py-3.5 font-semibold text-slate-600 hover:bg-slate-100">
                        Back
                      </button>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-night-950 px-7 py-3.5 font-semibold text-white transition hover:bg-electric-600"
                      >
                        Review
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={send} className="mt-8">
                    <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                      {review.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 px-5 py-3 text-sm">
                          <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">{k}</dt>
                          <dd className="whitespace-pre-line break-words text-slate-900">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={() => setStep(1)} className="rounded-full px-5 py-3.5 font-semibold text-slate-600 hover:bg-slate-100">
                        Back
                      </button>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric-500 to-electric-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-electric-500/25 transition hover:brightness-110"
                      >
                        Send enquiry
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
