"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/site";
import { ArrowRight, Check } from "./icons";
import { Magnetic } from "./Magnetic";
import { QuickQuote } from "./QuickQuote";

const SLIDE_MS = 5500;

const ticker = [
  "Commodities",
  "Textiles",
  "Baby Products",
  "Product Sourcing",
  "Quality Inspection",
  "Sea · Air · Land Freight",
  "Customs Clearance",
  "Trade Documentation",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps on every tab click so the timer restarts even on the current slide
  const stage = useRef<HTMLDivElement>(null);
  const slide = heroSlides[index];

  // Auto-advance; pause while the tab is hidden or the user prefers reduced motion
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, cycle]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Subtle mouse parallax on the photo (mouse only)
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !stage.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * -18;
    const y = (e.clientY / window.innerHeight - 0.5) * -12;
    stage.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
  };

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night-950 text-white"
    >
      {/* Slideshow: photos cross-fade with the headline word */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div ref={stage} className="absolute inset-0 scale-[1.04] transition-transform duration-[1.2s] ease-out">
          {heroSlides.map((s, i) => (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-[1.4s] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(orientation: portrait) 180vh, 100vw"
                className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
                style={{ objectPosition: s.position }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legibility: deep fade from the text side, vignette and bottom fade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/75 to-night-950/30 lg:bg-gradient-to-r lg:from-night-950/95 lg:via-night-950/70 lg:to-night-950/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night-950 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-night-950/70 to-transparent" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-electric-600/25 blur-[130px]" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-end gap-12 px-5 pb-6 pt-28 sm:px-8 sm:pb-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:pt-36">
        <div className="min-w-0">
          <h1 className="text-[3.1rem] font-medium leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-[5.75rem]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.1s" }}>
                We move
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.22s" }}>
                <span key={slide.word} className="text-gradient inline-block animate-word pb-[0.08em]">
                  {slide.word}
                </span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.34s" }}>
                across borders.
              </span>
            </span>
            <span className="sr-only">Commodities, textiles, baby products and quality goods.</span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-white/75 [animation-delay:0.55s] sm:mt-7 sm:text-lg">
            Littlenext is an Australian-based parent company in international trade. Our specialised divisions source,
            inspect, ship and deliver, so you get the right goods on time with one partner accountable end to end.
          </p>

          <div className="mt-8 grid animate-rise grid-cols-2 gap-3 [animation-delay:0.7s] sm:mt-9 sm:flex">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-[15px] font-semibold text-night-950 shadow-[0_10px_40px_-10px_rgb(255_255_255/0.45)] transition hover:bg-electric-300 sm:px-7 sm:py-4 sm:text-base"
              >
                Get a quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#divisions"
                className="glass-dark inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10 sm:px-7 sm:py-4 sm:text-base"
              >
                Our divisions
              </a>
            </Magnetic>
          </div>

          <ul className="mt-9 hidden animate-rise flex-wrap gap-x-6 gap-y-2 text-sm text-white/65 [animation-delay:0.85s] sm:flex">
            {["Quality inspected", "Documents handled", "Door-to-door logistics"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-electric-400" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Instant enquiry widget: desktop only */}
        <div className="hidden animate-rise [animation-delay:0.5s] lg:block lg:justify-self-end lg:pl-6">
          <QuickQuote />
        </div>
      </div>

      {/* Slide tabs with progress */}
      <div className="mx-auto w-full max-w-7xl animate-rise px-5 pb-6 [animation-delay:1s] sm:px-8 sm:pb-8">
        <div role="tablist" aria-label="Featured trade categories" className="grid grid-cols-4 gap-2 sm:gap-4">
          {heroSlides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setIndex(i);
                  setCycle((c) => c + 1);
                }}
                className="group text-left"
              >
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15">
                  {active ? (
                    <span
                      key={`${index}-${paused}-${cycle}`}
                      className="absolute inset-0 origin-left animate-fill-x rounded-full bg-gradient-to-r from-electric-400 to-cyan-300"
                      style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  ) : (
                    <span className={`absolute inset-0 rounded-full ${i < index ? "bg-white/45" : ""} group-hover:bg-white/35`} />
                  )}
                </span>
                <span className="mt-3 hidden items-baseline gap-2 sm:flex">
                  <span className={`font-mono text-[11px] transition-colors ${active ? "text-amber-brand" : "text-white/35"}`}>
                    0{i + 1}
                  </span>
                  <span className={`text-sm font-medium transition-colors ${active ? "text-white" : "text-white/45 group-hover:text-white/75"}`}>
                    {s.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Capability ticker */}
      <div className="border-t border-white/10 bg-night-950/50 py-4 backdrop-blur sm:py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              {t}
              <span className="h-1 w-1 rounded-full bg-electric-400" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
