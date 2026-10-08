"use client";

import Image from "next/image";
import { useState } from "react";
import { divisions } from "@/lib/site";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

export function Divisions() {
  const [active, setActive] = useState(0);

  return (
    <section id="divisions" className="relative isolate overflow-hidden bg-night-950 py-24 text-white sm:py-36">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="absolute right-0 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-electric-600/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          index="02"
          label="Divisions"
          title={
            <>
              Three specialised divisions.
              <br className="hidden sm:block" /> <span className="text-white/40">One trusted group.</span>
            </>
          }
          text="Each division has its own supplier network and product expertise — backed by the group's logistics, quality and compliance teams."
        />

        <Reveal className="mt-14 flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
          {divisions.map((d, i) => {
            const isActive = active === i;
            return (
              <article
                key={d.id}
                id={d.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative h-[30rem] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-night-800 transition-[flex-grow,flex] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:h-auto lg:min-w-0 lg:[flex:var(--grow)_1_0%]"
                style={{ "--grow": isActive ? 3.2 : 1 } as React.CSSProperties}
              >
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className={`object-cover transition duration-1000 ${isActive ? "scale-100" : "lg:scale-110 lg:grayscale-[60%]"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-night-950/10" />

                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <span className="rounded-full border border-white/20 bg-night-950/40 px-3 py-1 font-mono text-xs backdrop-blur">
                    0{i + 1}
                  </span>
                </div>

                {/* Collapsed label (desktop only) */}
                <h3
                  aria-hidden={isActive}
                  className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-2xl font-semibold tracking-tight transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
                    isActive ? "opacity-0" : "rotate-180 opacity-100"
                  }`}
                >
                  {d.title}
                </h3>

                {/* Expanded content (always visible on mobile) */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 sm:p-8 ${
                    isActive ? "lg:translate-y-0 lg:opacity-100 lg:delay-200" : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0"
                  }`}
                >
                  <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{d.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-white/75">{d.summary}</p>
                  <ul className="mt-5 flex max-w-xl flex-wrap gap-2">
                    {d.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85 backdrop-blur"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={(e) => e.stopPropagation()}
                    className="group/link mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-night-950 transition hover:bg-electric-300"
                  >
                    Enquire about {d.title.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </Reveal>

        <p className="mt-6 text-center text-sm text-white/45">
          Looking for something else?{" "}
          <a href="#contact" className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Our sourcing team works beyond our core categories →
          </a>
        </p>
      </div>
    </section>
  );
}
