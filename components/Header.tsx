"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRight, Close, Menu } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? "border-b border-ink-900/10 bg-sand-50 shadow-xl"
          : scrolled
          ? "border-b border-ink-900/10 bg-sand-50/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo dark={solid} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solid ? "text-ink-700 hover:bg-ink-900/5 hover:text-ink-950" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-sm transition hover:bg-gold-300 sm:inline-flex"
          >
            Get a quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
              solid ? "text-ink-900 hover:bg-ink-900/5" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[32rem]" : "max-h-0"}`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-lg font-medium text-ink-900 hover:bg-ink-900/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3.5 font-semibold text-white"
          >
            Get a quote <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
