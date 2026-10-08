import { divisions, services, site, steps, values } from "@/lib/site";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { ArrowRight, ArrowUpRight, Check, divisionIcons, Plus, serviceIcons } from "./icons";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
        light ? "text-gold-300" : "text-gold-600"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-gold-300" : "bg-gold-600"}`} />
      {children}
    </p>
  );
}

/* ---------- Ticker ---------- */

const tickerItems = [
  "Commodities",
  "Textiles",
  "Baby Products",
  "Product Sourcing",
  "Quality Inspection",
  "Freight & Logistics",
  "Customs Clearance",
  "Trade Documentation",
];

export function Ticker() {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-y border-ink-950/10 bg-gold-400 py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 text-sm font-bold uppercase tracking-[0.18em] text-ink-950">
            {t}
            <span className="text-ink-950/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- About ---------- */

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Eyebrow>About {site.name}</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            One group. <span className="font-serif font-normal italic text-gold-600">Specialised</span> divisions.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            {site.name} is the parent company behind a family of focused trading businesses. Each division has deep
            knowledge of its products, suppliers and markets — while sharing the group&apos;s sourcing network,
            logistics partners and compliance expertise.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            For our partners, that means the attention of a specialist with the reliability of a group: one
            relationship, one standard of quality, across everything you buy or sell.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-900/10 pt-8">
            {[
              ["3", "Core divisions"],
              ["B2B", "Import & export"],
              ["360°", "Sourcing to delivery"],
            ].map(([k, v]) => (
              <div key={v} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-500">{v}</dt>
                <dd className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{k}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Group structure */}
        <Reveal delay={150}>
          <div className="relative rounded-[2rem] border border-ink-900/10 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-10">
            <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-ink-950 px-5 py-4 text-white shadow-lg">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-300">Parent company</p>
                <p className="text-lg font-bold">{site.name}</p>
              </div>
            </div>

            <svg viewBox="0 0 300 60" className="mx-auto h-14 w-full max-w-md text-ink-900/20" aria-hidden="true">
              <path d="M150 0v30M50 30h200M50 30v30M150 30v30M250 30v30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            <div className="grid grid-cols-3 gap-3">
              {divisions.map((d) => {
                const Icon = divisionIcons[d.id];
                return (
                  <a
                    key={d.id}
                    href={`#${d.id}`}
                    className="group flex flex-col items-center rounded-2xl border border-ink-900/10 bg-sand-50 px-2 py-5 text-center transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-lg"
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${toneStyles[d.tone].iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="mt-3 text-xs font-semibold leading-tight sm:text-base">{d.title}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-ink-900/20 px-4 py-3 text-sm text-ink-500">
              <Plus className="h-4 w-4" /> Future divisions as we grow
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Divisions ---------- */

const toneStyles = {
  amber: {
    iconBg: "bg-amber-100 text-amber-700",
    bar: "from-amber-300 to-amber-500",
    chip: "bg-amber-50 text-amber-800 ring-amber-200",
    glow: "group-hover:shadow-amber-500/15",
  },
  indigo: {
    iconBg: "bg-indigo-100 text-indigo-700",
    bar: "from-indigo-300 to-indigo-500",
    chip: "bg-indigo-50 text-indigo-800 ring-indigo-200",
    glow: "group-hover:shadow-indigo-500/15",
  },
  teal: {
    iconBg: "bg-teal-100 text-teal-700",
    bar: "from-teal-300 to-teal-500",
    chip: "bg-teal-50 text-teal-800 ring-teal-200",
    glow: "group-hover:shadow-teal-500/15",
  },
} as const;

export function Divisions() {
  return (
    <section id="divisions" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Our divisions</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What we <span className="font-serif font-normal italic text-gold-600">trade</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink-500">
            Three focused divisions, each with its own supplier network and product expertise — all backed by one
            group.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {divisions.map((d, i) => {
            const Icon = divisionIcons[d.id];
            const tone = toneStyles[d.tone];
            return (
              <Reveal key={d.id} delay={i * 120} as="article">
                <div
                  id={d.id}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-sand-50 p-8 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-2xl ${tone.glow}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${tone.bar}`} />
                  <div className="flex items-start justify-between">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl ${tone.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="text-sm font-semibold text-ink-300">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-bold tracking-tight">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{d.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {d.items.map((item) => (
                      <li key={item} className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${tone.chip}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-ink-900"
                  >
                    Enquire about {d.title.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-ink-950 p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Looking for something else?</h3>
              <p className="mt-2 max-w-xl text-ink-300">
                Our sourcing team works beyond our core categories. Tell us the product and market — we&apos;ll find the
                right supplier.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 font-semibold text-ink-950 transition hover:bg-gold-300"
            >
              Request sourcing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-ink-900 py-24 text-white sm:py-32">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow light>What we do</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Everything between <span className="font-serif font-normal italic text-gold-400">supplier</span> and{" "}
            <span className="font-serif font-normal italic text-gold-400">shelf</span>
          </h2>
          <p className="mt-6 text-lg text-ink-300">
            Whether you are buying or selling across borders, we handle the details so you can focus on your business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 100} className="h-full">
                <div className="group h-full bg-ink-900 p-8 transition-colors hover:bg-ink-800 sm:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-gold-400 transition group-hover:border-gold-400/50 group-hover:bg-gold-400 group-hover:text-ink-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-300">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>How it works</Eyebrow>
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            From enquiry to delivery in <span className="font-serif font-normal italic text-gold-600">four steps</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ink-900/20 to-transparent lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 120} className="relative">
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink-950 text-lg font-bold text-gold-400 shadow-lg ring-8 ring-sand-50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-500">{s.text}</p>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us + CTA ---------- */

export function WhyUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal>
            <Eyebrow>Why {site.name}</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A partner you can <span className="font-serif font-normal italic text-gold-600">build on</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              International trade has a lot of moving parts. We keep them moving in the right direction — with clear
              communication, careful quality control and long-term thinking.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-ink-900/10 bg-sand-50 p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-ink-950">
                    <Check className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-500">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-24">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 px-8 py-14 text-ink-950 sm:px-14 sm:py-16">
            <svg
              viewBox="0 0 400 400"
              className="absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] text-ink-950/10"
              aria-hidden="true"
            >
              {[60, 110, 160, 200].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />
              ))}
            </svg>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Ready to trade with confidence?
                </h2>
                <p className="mt-3 text-lg text-ink-950/75">
                  Share your requirement and our team will come back with options and a clear quotation.
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-950 px-7 py-4 font-semibold text-white transition hover:bg-ink-800"
              >
                Talk to our team
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
