"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const HEADER_OFFSET = -96;

/** Momentum scrolling for mouse and trackpad. Touch devices and reduced-motion users keep native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: HEADER_OFFSET },
      // let inner scrollers (carousels, textareas, the mobile menu) scroll natively
      prevent: (node) => Boolean(node.closest?.("[data-lenis-prevent], textarea, #mobile-nav")),
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}

/** Scroll to a section, smoothly when Lenis is active. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: HEADER_OFFSET });
  else el.scrollIntoView({ behavior: "smooth" });
}
