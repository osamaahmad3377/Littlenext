"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/** Sticky "Get a quote" bar on small screens: shown after the hero, hidden over the contact form. */
export function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-500 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a
        href="#contact"
        className="flex items-center justify-between rounded-full border border-white/10 bg-night-950/90 py-2 pl-5 pr-2 text-white shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <span className="text-sm font-medium">Need a quote?</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-night-950">
          Get started <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}
