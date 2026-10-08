"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { ArrowRight } from "./icons";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const range = (p: number, from: number, to: number) => clamp((p - from) / (to - from));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-driven moment: a photo starts as an inset rounded card and expands to fill the screen,
 * then the statement fades in line by line. Styles are written straight to the DOM (no re-renders).
 */
export function Showcase() {
  const track = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const lines = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el || !frame.current || !photo.current) return;
      const rect = el.getBoundingClientRect();
      const p = reduce ? 1 : clamp(-rect.top / (rect.height - window.innerHeight));

      const open = ease(range(p, 0, 0.55));
      const mobile = window.innerWidth < 640;
      const insetY = (1 - open) * (mobile ? 18 : 12);
      const insetX = (1 - open) * (mobile ? 5 : 9);
      const radius = (1 - open) * 32;
      frame.current.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
      photo.current.style.transform = `scale(${1.18 - 0.18 * open}) translateY(${(p - 0.5) * -4}%)`;

      const stops = [0.35, 0.47, 0.6, 0.7];
      lines.current.forEach((line, i) => {
        if (!line) return;
        const t = ease(range(p, stops[i], stops[i] + 0.12));
        line.style.opacity = String(t);
        line.style.transform = `translateY(${(1 - t) * 40}px)`;
        line.style.filter = `blur(${(1 - t) * 8}px)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const setLine = (i: number) => (el: HTMLElement | null) => {
    lines.current[i] = el;
  };

  return (
    <section ref={track} aria-label={`${site.name} statement`} className="relative h-[230vh] bg-night-950">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={frame} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(12% 9% 12% 9% round 32px)" }}>
          <div ref={photo} className="absolute inset-0 will-change-transform">
            <Image src="/images/airport-sunset.jpg" alt="" fill sizes="(orientation: portrait) 240vh, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/45 to-night-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(3_6_13/0.55))]" />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p ref={setLine(0)} className="font-mono text-xs uppercase tracking-[0.3em] text-amber-brand opacity-0">
            Melbourne · Victoria · Australia
          </p>
          <h2 className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-[7rem]">
            <span ref={setLine(1)} className="block opacity-0">
              Proudly Australian.
            </span>
            <span ref={setLine(2)} className="text-gradient block pb-[0.08em] opacity-0">
              Trading Worldwide.
            </span>
          </h2>
          <div ref={setLine(3)} className="mt-9 flex flex-col items-center gap-6 opacity-0">
            <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              One group and three specialised divisions, connecting Australia with suppliers and buyers across the world.
            </p>
            <a
              href="#divisions"
              className="group glass-dark glass-edge inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition hover:bg-white/15"
            >
              See what we trade
              <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
