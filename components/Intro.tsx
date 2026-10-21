import Image from "next/image";
import { facts, site } from "@/lib/site";
import { ScrollText } from "./fx";
import { ArrowRight } from "./icons";
import { LogoTile } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

const statement =
  "Little Next is an Australian-based parent company built for modern trade. Our commodities, textiles and baby products divisions share one team for sourcing, quality, shipping and paperwork, so our partners deal with one accountable name.";

export function Intro() {
  return (
    <section id="about" className="mesh-light relative isolate overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01">About {site.name}</SectionLabel>
        <ScrollText
          text={statement}
          className="mt-7 max-w-5xl text-[1.6rem] font-normal leading-[1.22] tracking-[-0.015em] text-night-950 sm:text-[2.75rem] sm:leading-[1.15]"
        />
        <a
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 font-semibold text-night-950 underline decoration-neutral-300 underline-offset-[6px] transition hover:decoration-electric-500"
        >
          Read our story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="mt-12 grid gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative min-h-[18rem] overflow-hidden rounded-[1.75rem] bg-night-900 sm:min-h-[26rem] sm:rounded-[2rem]">
            <Image
              src="/images/container-yard.jpg"
              alt="Aerial view of a container yard at dusk"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover transition duration-[1.5s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
            <div className="glass-dark glass-edge absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl p-3 pr-5 text-white sm:inset-x-auto sm:bottom-5 sm:left-6">
              <LogoTile />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">Parent company</p>
                <p className="text-sm font-semibold sm:text-base">Commodities · Textiles · Baby Products</p>
              </div>
            </div>
          </Reveal>

          {/* Company profile */}
          <Reveal delay={100}>
            <div className="glass glass-edge h-full rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-9">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-night-950">Company at a glance</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric-500" />
                  Australia
                </span>
              </div>
              <dl className="mt-6 divide-y divide-neutral-200/80">
                {facts.map((f) => (
                  <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 sm:pt-0.5">{f.label}</dt>
                    <dd className="font-medium leading-snug text-night-950">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
