import Image from "next/image";
import { divisions, heroWords } from "@/lib/site";
import { RotatingWord } from "./fx";
import { ArrowRight, Check } from "./icons";
import { Magnetic } from "./Magnetic";
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
          sizes="(orientation: portrait) 180vh, 100vw"
          className="animate-kenburns object-cover opacity-75 lg:opacity-60"
        />
      </div>
      {/* Mobile: image shows at the top, text sits on a dark fade at the bottom */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/85 to-night-950/20 lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-night-950 via-night-950/80 to-night-950/30 lg:block" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-night-950 via-transparent to-night-950/60 lg:block" />
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-electric-600/25 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-end gap-12 px-5 pb-8 pt-28 sm:px-8 sm:pb-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:pt-36">
        <div className="min-w-0">
          <h1 className="text-[3.1rem] font-medium leading-[0.98] tracking-[-0.05em] sm:text-7xl lg:text-[5.6rem]">
            {/* Each line slides up out of its own mask on load */}
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.1s" }}>
                We move
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.22s" }}>
                <RotatingWord words={heroWords} />
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-line-up" style={{ animationDelay: "0.34s" }}>
                across borders.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise text-base leading-relaxed text-white/70 [animation-delay:0.55s] sm:mt-7 sm:text-lg">
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

          {/* Mobile: swipeable division shortcuts */}
          <ul className="-mx-5 mt-8 flex animate-rise gap-2 overflow-x-auto px-5 [animation-delay:0.85s] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
            {divisions.map((d) => (
              <li key={d.id} className="shrink-0">
                <a
                  href={`#${d.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-electric-400" />
                  {d.title}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-10 hidden animate-rise flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 [animation-delay:0.85s] sm:flex">
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

      {/* Scroll cue (desktop) */}
      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 animate-rise flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 [animation-delay:1.1s] hover:text-white lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-gradient-to-b from-transparent via-white to-transparent" />
        </span>
      </a>

      {/* Capability ticker */}
      <div className="border-t border-white/10 bg-night-950/40 py-4 backdrop-blur sm:py-5" aria-hidden="true">
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
