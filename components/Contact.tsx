"use client";

import { useState } from "react";
import { divisions, site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { ArrowRight, Chat, Check, Clock, Mail, Phone, Pin } from "./icons";

const fieldClass =
  "mt-2 w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-400/25";

export function Contact() {
  const [sent, setSent] = useState(false);
  const { contact } = site;

  const details = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    ...(contact.whatsapp
      ? [{ icon: Chat, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${contact.whatsapp}` }]
      : []),
    { icon: Pin, label: "Office", value: contact.address },
    { icon: Clock, label: "Business hours", value: contact.hours },
  ];

  // No backend yet: compose the enquiry in the visitor's email app.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Enquiry: ${get("interest")} — ${get("company") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Interested in: ${get("interest")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.25fr]">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            <span className="h-px w-8 bg-gold-600" />
            Contact
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Let&apos;s talk <span className="font-serif font-normal italic text-gold-600">trade</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-500">
            Buying or selling, one shipment or a long-term contract — send us your requirement and we&apos;ll respond
            within one business day.
          </p>

          <ul className="mt-10 space-y-3">
            {details.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-950 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-ink-500">{label}</span>
                    <span className="block truncate font-semibold text-ink-900">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-3 pr-5 transition hover:border-gold-400 hover:shadow-md"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-white p-3 pr-5">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-[2rem] border border-ink-900/10 bg-white p-6 shadow-2xl shadow-ink-900/10 sm:p-10">
            {sent ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-ink-950">
                  <Check className="h-8 w-8" strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 text-2xl font-bold">Almost there</h3>
                <p className="mt-3 max-w-sm text-ink-500">
                  Your email app should have opened with your enquiry ready to send. If it didn&apos;t, write to us
                  directly at{" "}
                  <a href={`mailto:${contact.email}`} className="font-semibold text-ink-900 underline">
                    {contact.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full border border-ink-900/15 px-5 py-2.5 font-semibold hover:bg-sand-50"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <h3 className="text-2xl font-bold sm:col-span-2">Send an enquiry</h3>
                <label className="text-sm font-semibold text-ink-700">
                  Full name *
                  <input name="name" required autoComplete="name" className={fieldClass} placeholder="Jane Smith" />
                </label>
                <label className="text-sm font-semibold text-ink-700">
                  Company
                  <input name="company" autoComplete="organization" className={fieldClass} placeholder="Company Ltd." />
                </label>
                <label className="text-sm font-semibold text-ink-700">
                  Email *
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </label>
                <label className="text-sm font-semibold text-ink-700">
                  Phone / WhatsApp
                  <input name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="+1 555 000 0000" />
                </label>
                <label className="text-sm font-semibold text-ink-700 sm:col-span-2">
                  I&apos;m interested in *
                  <select
                    name="interest"
                    required
                    defaultValue=""
                    className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%234a6283'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12 font-normal invalid:text-ink-300`}
                  >
                    <option value="" disabled>
                      Select a division
                    </option>
                    {divisions.map((d) => (
                      <option key={d.id}>{d.title}</option>
                    ))}
                    <option>Product sourcing (other)</option>
                    <option>Exporting my products</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-ink-700 sm:col-span-2">
                  Your requirement *
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    placeholder="Product, specification, quantity, destination country and timeline…"
                  />
                </label>
                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-ink-500">We reply within one business day.</p>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-7 py-4 font-semibold text-white transition hover:bg-ink-800"
                  >
                    Send enquiry
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
