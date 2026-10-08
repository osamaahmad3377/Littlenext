import Image from "next/image";
import { stats } from "@/lib/site";
import { CountUp, ScrollText } from "./fx";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

const statement =
  "Littlenext is an Australian-based parent company built for modern trade. Our divisions for commodities, textiles and baby products share one team that handles sourcing, quality, shipping and paperwork. Our partners deal with one accountable name, not a chain of intermediaries.";

export function Intro() {
  return (
    <section id="about" className="mesh-light relative isolate overflow-hidden py-20 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01">About Littlenext</SectionLabel>
        <ScrollText
          text={statement}
          className="mt-7 max-w-5xl text-[1.65rem] font-medium leading-[1.2] tracking-[-0.025em] text-night-950 sm:text-5xl sm:leading-[1.12]"
        />

        <div className="mt-12 grid gap-3 sm:gap-5 lg:mt-24 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="relative min-h-[17rem] overflow-hidden rounded-[1.75rem] sm:min-h-[22rem] sm:rounded-[2rem] bg-night-900">
            <Image
              src="/images/container-yard.jpg"
              alt="Aerial view of a container yard at dusk"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover transition duration-[1.5s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 glass-dark glass-edge flex items-center gap-3 rounded-2xl p-3 pr-5 text-white sm:bottom-5 sm:inset-x-auto sm:left-6">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">Parent company</p>
                <p className="text-sm font-semibold sm:text-base">Commodities · Textiles · Baby Products</p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="glass glass-edge flex h-full flex-col justify-between rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-1 sm:rounded-[1.75rem] sm:p-7">
                  <span className="bg-gradient-to-br from-night-950 via-electric-600 to-electric-400 bg-clip-text font-mono text-[2.75rem] font-medium leading-none tracking-tight text-transparent sm:text-6xl">
                    <CountUp to={s.value} />
                  </span>
                  <span className="mt-6 text-sm leading-snug sm:mt-8 text-slate-600 sm:text-base">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
