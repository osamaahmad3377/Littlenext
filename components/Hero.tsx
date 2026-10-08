import { divisions } from "@/lib/site";
import { Globe } from "./Globe";
import { ArrowRight, Check } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="absolute -bottom-48 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-ink-700/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-40">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Import · Export · Global sourcing
          </p>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Connecting markets,
            <br />
            <span className="font-serif text-[1.08em] font-normal italic text-gold-400">delivering</span> quality.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300">
            Littlenext is a parent company in international trade. Through specialised divisions we source, ship and
            supply <span className="text-white">commodities</span>, <span className="text-white">textiles</span> and{" "}
            <span className="text-white">baby products</span> — reliably, transparently and at scale.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-4 font-semibold text-ink-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-300"
            >
              Start an enquiry
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#divisions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Explore our divisions
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-300">
            {divisions.map((d) => (
              <li key={d.id} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-400" />
                {d.title}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold-400" />
              Sourcing on request
            </li>
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
          <Globe />

          <div className="absolute -left-2 top-[14%] animate-float rounded-2xl border border-white/10 bg-ink-900/80 p-4 shadow-2xl backdrop-blur-md sm:-left-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-300">End-to-end</p>
            <ol className="mt-2 space-y-1.5 text-sm">
              {["Sourced", "Inspected", "Shipped"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-400 text-ink-950">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div
            className="absolute -right-1 bottom-[12%] animate-float rounded-2xl border border-white/10 bg-white p-4 text-ink-900 shadow-2xl sm:-right-4"
            style={{ animationDelay: "-3.5s" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">One partner</p>
            <p className="mt-1 text-lg font-bold leading-tight">
              3 divisions
              <br />
              <span className="font-serif text-xl font-normal italic text-gold-600">many markets</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
