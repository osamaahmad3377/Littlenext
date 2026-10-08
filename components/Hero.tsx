import Image from "next/image";
import { divisions, heroWords } from "@/lib/site";
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
          <h1 className="text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.6rem]">
            We move
            <br />
            <RotatingWord words={heroWords} />
            <br />
            across borders.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:mt-7 sm:text-lg">
            Littlenext is an Australian-based parent company in international trade. Our specialised divisions source,
            inspect, ship and deliver, so you get the right goods on time with one partner accountable end to end.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:flex">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-[15px] font-semibold text-night-950 transition hover:bg-electric-300 sm:px-7 sm:py-4 sm:text-base"
            >
              Get a quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#divisions"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-base"
            >
              Our divisions
            </a>
          </div>

          {/* Mobile: swipeable division shortcuts */}
          <ul className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
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

          <ul className="mt-10 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 sm:flex">
            {["Quality inspected", "Documents handled", "Door-to-door logistics"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-electric-400" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Instant enquiry widget: desktop only */}
        <div className="hidden lg:block lg:justify-self-end lg:pl-6">
          <QuickQuote />
        </div>
      </div>

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
