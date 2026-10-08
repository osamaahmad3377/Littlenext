"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRight, Close, Menu } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const sections = [...site.nav.map((n) => n.href), "#top", "#why", "#contact"]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
        <div
          className={`mx-auto flex items-center justify-between rounded-full border border-white/10 bg-night-950/85 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-500 ${
            scrolled ? "h-14 max-w-5xl pl-4 pr-2" : "h-16 max-w-7xl pl-5 pr-2.5"
          }`}
        >
          <a href="#top" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <Logo light />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === item.href ? "bg-white/10 text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-night-950 transition hover:bg-electric-300 sm:inline-flex"
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
              className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-night-950/95 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-center gap-2 px-8">
          {[...site.nav, { label: "Contact", href: "#contact" }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight text-white transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <span className="font-mono text-sm text-electric-400">0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-night-950"
          >
            Get a quote <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </>
  );
}
