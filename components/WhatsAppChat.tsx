"use client";

import { WhatsappLogo, X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { LogoMark } from "./Logo";

const quickTopics = ["Get a quote", "Import enquiry", "Export enquiry", "Product sourcing"];

function waLink(text: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Floating WhatsApp button with a small chat card that opens WhatsApp with a pre-filled message. */
export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState("");
  const panel = useRef<HTMLDivElement>(null);

  // A gentle "Need help?" bubble after a few seconds, once per visit
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ln-wa-hint") === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setShowHint(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    try {
      sessionStorage.setItem("ln-wa-hint", "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!site.contact.whatsapp) return null;

  const start = (text: string) => {
    window.open(waLink(text || `Hello ${site.name}, I'd like to make an enquiry.`), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div ref={panel} className="fixed bottom-24 right-4 z-[35] flex flex-col items-end sm:bottom-6 sm:right-6">
      {/* Chat card */}
      <div
        role="dialog"
        aria-label={`Chat with ${site.name} on WhatsApp`}
        aria-hidden={!open}
        className={`mb-4 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-[0_30px_80px_-20px_rgb(3_6_13/0.55)] transition-all duration-300 ease-out ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="relative flex items-center gap-3 bg-night-950 px-5 py-4 text-white">
          <span className="relative">
            <LogoMark className="h-10 w-10" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-night-950 bg-[#25D366]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{site.name} Team</p>
            <p className="text-xs text-white/60">Typically replies within a few hours</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Close chat"
            className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="bg-[#efeae2] bg-[radial-gradient(rgb(0_0_0/0.035)_1px,transparent_1px)] [background-size:14px_14px] px-4 py-5">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm">
            <p className="font-semibold text-night-950">Hi there 👋</p>
            <p className="mt-1">
              Welcome to {site.name}. How can we help with your import, export or sourcing needs today?
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickTopics.map((t) => (
              <button
                key={t}
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => start(`Hello ${site.name}, I'm interested in: ${t}.`)}
                className="rounded-full border border-[#25D366]/40 bg-white px-3 py-1.5 text-xs font-medium text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            start(message.trim());
            setMessage("");
          }}
          className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
        >
          <label className="sr-only" htmlFor="wa-message">
            Your message
          </label>
          <input
            id="wa-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            tabIndex={open ? 0 : -1}
            placeholder="Type a message…"
            className="min-w-0 flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#25D366]/40 sm:text-sm"
          />
          <button
            type="submit"
            tabIndex={open ? 0 : -1}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]"
          >
            <WhatsappLogo size={18} weight="fill" />
            Start chat
          </button>
        </form>
        <p className="bg-white pb-3 text-center text-[11px] text-slate-400">Opens WhatsApp · {site.contact.phone}</p>
      </div>

      {/* Hint bubble */}
      <div
        className={`mb-3 flex items-center gap-2 rounded-2xl bg-white py-2 pl-4 pr-2 text-sm font-medium text-night-950 shadow-xl transition-all duration-500 ${
          showHint && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        aria-hidden={!showHint || open}
      >
        Need help? Chat with us
        <button
          type="button"
          onClick={dismissHint}
          tabIndex={showHint && !open ? 0 : -1}
          aria-label="Dismiss"
          className="grid h-6 w-6 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={12} weight="bold" />
        </button>
      </div>

      {/* Floating button */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          dismissHint();
        }}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgb(37_211_102/0.6)] transition duration-300 hover:scale-105 hover:bg-[#1ebe5b] sm:h-16 sm:w-16"
      >
        {!open && <span className="absolute inset-0 animate-ping-slow rounded-full bg-[#25D366]/40" aria-hidden="true" />}
        <span className={`relative transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
          {open ? <X size={26} weight="bold" /> : <WhatsappLogo size={32} weight="fill" />}
        </span>
      </button>
    </div>
  );
}
