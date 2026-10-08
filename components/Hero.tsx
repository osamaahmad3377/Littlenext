import Image from "next/image";
import { heroWords } from "@/lib/site";
import { RotatingWord } from "./fx";
import { ArrowRight, Check } from "./icons";
import { QuickQuote } from "./QuickQuote";

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
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night-950 text-white">
      {/* Background photo with slow zoom */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/hero-port.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950 via-night-950/80 to-night-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-transparent to-night-950/60" />
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-electric-600/25 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:pt-36">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" />
            Import · Export · Global sourcing
          </p>

          <h1 className="mt-7 text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.6rem]">
            We move
            <br />
            <RotatingWord words={heroWords} />
            <br />
            across borders.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Littlenext is a parent company in international trade. Our specialised divisions source, inspect, ship and
            deliver — so you get the right goods, on time, with one partner accountable end to end.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-night-950 transition hover:bg-electric-300"
            >
              Start an enquiry
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#divisions"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              Explore divisions
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {["Quality inspected", "Documents handled", "Door-to-door logistics"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-electric-400" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:justify-self-end lg:pl-6">
          <QuickQuote />
        </div>
      </div>

      {/* Capability ticker */}
      <div className="border-t border-white/10 bg-night-950/40 py-5 backdrop-blur" aria-hidden="true">
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
