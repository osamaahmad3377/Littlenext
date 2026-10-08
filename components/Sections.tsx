import Image from "next/image";
import { divisions, services, site, steps, values } from "@/lib/site";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { ArrowRight, ArrowUpRight, Check, serviceIcons } from "./icons";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-accent-400" : "text-brand-500"}`}>
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className={`mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl ${light ? "text-white" : "text-brand-950"}`}
        >
          {title}
        </h2>
      </div>
      {text && (
        <p className={`max-w-lg text-lg leading-relaxed lg:justify-self-end ${light ? "text-brand-200" : "text-slate-600"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- About ---------- */

const aboutPoints = [
  "Specialist teams for each product category",
  "A shared network of suppliers and logistics partners",
  "One standard of quality and compliance across the group",
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/images/container-yard.jpg"
              alt="Aerial view of a container yard at dusk"
              width={1600}
              height={2000}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-3 w-[45%] overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl sm:-right-8">
            <Image
              src="/images/warehouse.jpg"
              alt="Warehouse aisle with stocked shelves"
              width={1200}
              height={1200}
              sizes="260px"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-xl backdrop-blur sm:left-6 sm:top-6">
            <LogoMark className="h-10 w-10" />
            <div>
              <p className="text-xs font-medium text-slate-500">Parent company</p>
              <p className="font-semibold text-brand-950">3 trading divisions</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>About {site.name}</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.1] text-brand-950 sm:text-5xl">
            One group. Specialised divisions.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {site.name} is the parent company behind a family of focused trading businesses. Each division knows its
            products, suppliers and markets in depth — while sharing the group&apos;s sourcing network, logistics
            partners and compliance expertise.
          </p>
          <ul className="mt-8 space-y-4">
            {aboutPoints.map((p) => (
              <li key={p} className="flex gap-3 text-slate-700">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#divisions"
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-500"
          >
            Explore our divisions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Divisions ---------- */

export function Divisions() {
  return (
    <section id="divisions" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our divisions"
          title="What we trade"
          text="Three focused divisions, each with its own supplier network and product expertise — all backed by one group."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d, i) => (
            <Reveal key={d.id} delay={i * 100} as="article" className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <div
                id={d.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    width={1400}
                    height={1000}
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 md:max-lg:aspect-[16/7]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-semibold text-brand-950">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{d.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {d.items.map((item) => (
                      <li key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-1.5 pt-8 font-semibold text-brand-700 hover:text-brand-500"
                  >
                    Enquire about {d.title.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-7 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-semibold text-brand-950">Looking for something else?</h3>
              <p className="mt-1.5 max-w-xl text-slate-600">
                Our sourcing team works beyond our core categories. Tell us the product and market — we&apos;ll find the
                right supplier.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:border-brand-900 hover:bg-brand-900 hover:text-white"
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
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Everything between supplier and shelf"
          text="Whether you are buying or selling across borders, we handle the details so you can focus on your business."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 80} className="h-full">
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-900 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-brand-950">{s.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-slate-600">{s.text}</p>
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
    <section id="process" className="bg-brand-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="How it works"
          title="From enquiry to delivery in four steps"
          text="A clear, predictable process — so you always know where your order stands."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 100} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent-400">Step {i + 1}</span>
                  <span className="text-5xl font-semibold leading-none text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-10 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 leading-relaxed text-brand-200">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Why us + CTA ---------- */

export function WhyUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal>
            <Eyebrow>Why {site.name}</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.1] text-brand-950 sm:text-5xl">
              A partner you can build on
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              International trade has a lot of moving parts. We keep them moving in the right direction — with clear
              communication, careful quality control and long-term thinking.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl bg-slate-50 p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
                    <Check className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-brand-950">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-24">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-950">
            <Image
              src="/images/airport-sunset.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/30" />
            <div className="max-w-2xl px-7 py-16 sm:px-14 sm:py-24">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
                Ready to trade with confidence?
              </h2>
              <p className="mt-5 text-lg text-brand-100">
                Share your requirement and our team will come back with options and a clear quotation.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-brand-950 transition hover:bg-brand-50"
                >
                  Talk to our team
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
