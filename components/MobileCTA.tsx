"use client";

import { useEffect, useState } from "react";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
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
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-night-950/90 p-2 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
        {site.contact.whatsapp && (
          <a
            href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hello ${site.name}, I'd like to make an enquiry.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
          >
            <WhatsappLogo size={24} weight="fill" />
          </a>
        )}
        <a
          href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
          aria-label={`Call ${site.contact.phone}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5"
        >
          <Phone size={20} weight="duotone" />
        </a>
        <a
          href="#contact"
          className="ml-auto inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-night-950"
        >
          Get a quote <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
