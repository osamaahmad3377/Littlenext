"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/site";
import { Check } from "./icons";
import { SectionLabel } from "./ui";

export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-20 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel index="05">Process</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-night-950 sm:text-6xl">
            From enquiry to delivery <span className="text-slate-400">in four steps.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            A clear, predictable process — so you always know where your order stands and what comes next.
          </p>

          <div className="mt-10 hidden max-w-sm lg:block" aria-hidden="true">
            <div className="flex items-baseline justify-between font-mono text-sm">
              <span className="text-night-950">Step {String(active + 1).padStart(2, "0")}</span>
              <span className="text-slate-400">/ {String(steps.length).padStart(2, "0")}</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <ol className="space-y-3 sm:space-y-5">
          {steps.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={`relative flex gap-4 rounded-[1.5rem] border p-5 transition-all duration-500 sm:gap-6 sm:rounded-[1.75rem] sm:p-8 ${
                  current
                    ? "border-electric-300/60 bg-white shadow-2xl shadow-electric-500/10"
                    : "border-transparent bg-slate-50"
                }`}
              >
                <span
                  className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs transition-colors duration-500 ${
                    current || done ? "bg-electric-500 text-white" : "bg-white text-slate-400 ring-1 ring-slate-200"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
                </span>
                <div className={`transition-opacity duration-500 ${current ? "opacity-100" : "opacity-60"}`}>
                  <h3 className="text-xl font-semibold tracking-tight text-night-950 sm:text-2xl">{s.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-slate-600">{s.text}</p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-600">
                    <span className="text-electric-600">→</span> {s.output}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
