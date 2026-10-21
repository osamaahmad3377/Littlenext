import Image from "next/image";
import { divisions, facts, site, values } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./icons";
import { LogoTile } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeading, SectionLabel } from "./ui";

const initials = site.founder.name
  .split(" ")
  .map((p) => p[0])
  .join("")
  .slice(0, 2);

/* ---------- Hero ---------- */

export function StoryHero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-night-950 text-white">
      <Image src="/images/hero-port.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/80 to-night-950/40" />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
        <SectionLabel index="00" light>
          Our story
        </SectionLabel>
        <h1 className="mt-6 max-w-4xl text-[2.9rem] font-medium leading-[1] tracking-[-0.05em] sm:text-7xl lg:text-[5.5rem]">
          Built in Melbourne. <span className="text-gradient">Made for global trade.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
          {site.name} is an Australian-based parent company in international import and export, founded by{" "}
          <span className="text-white">{site.founder.name}</span>.
        </p>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */

export function Founder() {
  const { founder } = site;
  return (
    <section className="mesh-light py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-night-950">
            {founder.photo ? (
              <>
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover object-[52%_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
              </>
            ) : (
              <>
                <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500 to-transparent" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center text-[9rem] font-semibold leading-none tracking-[-0.06em] text-white"
                >
                  <span>
                    {initials[0]}
                    <span className="text-electric-500">{initials[1]}</span>
                  </span>
                </span>
              </>
            )}
            <div className="glass-dark glass-edge absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl p-3 pr-5 text-white">
              <LogoTile />
              <div>
                <p className="font-semibold">{founder.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  {founder.role}, {site.name}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionLabel index="01">The founder</SectionLabel>
          <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-night-950 sm:text-6xl">
            {founder.name}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-electric-700">
            {founder.role} · {site.name}
          </p>

          {founder.message && (
            <blockquote className="mt-8 border-l-2 border-electric-500 pl-6 text-2xl font-medium leading-snug tracking-[-0.02em] text-night-950 sm:text-3xl">
              “{founder.message}”
            </blockquote>
          )}

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-neutral-600">
            <p>
              {founder.name} founded {site.name} in Melbourne, Victoria, as a parent company for specialised trading
              divisions in commodities, textiles and baby products.
            </p>
            <p>
              Buying or selling across borders usually means coordinating separate suppliers, inspectors, freight
              forwarders and customs paperwork. {site.name} brings those steps under one accountable name, so partners
              have a single point of contact from sourcing to delivery.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-night-950 px-6 py-3.5 font-semibold text-white transition hover:bg-night-800"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/#divisions"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-6 py-3.5 font-semibold text-night-950 transition hover:border-neutral-400"
            >
              What we trade
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Purpose + structure ---------- */

export function Purpose() {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 py-20 text-white sm:py-28 lg:py-32">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          index="02"
          label="How we're built"
          title={
            <>
              One parent company. <span className="text-white/40">Specialised divisions.</span>
            </>
          }
          text={`Each division focuses on its own products and supplier network, while sharing ${site.name}'s sourcing, quality, logistics and compliance team.`}
        />

        {/* Parent → divisions */}
        <Reveal className="mt-14">
          <div className="glass-dark glass-edge mx-auto flex w-fit items-center gap-3 rounded-2xl px-5 py-4">
            <LogoTile />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">Parent company</p>
              <p className="font-semibold">{site.name}</p>
            </div>
          </div>
          <div className="mx-auto hidden h-10 w-px bg-gradient-to-b from-electric-500 to-white/10 md:block" aria-hidden="true" />
          <div className="mx-auto hidden h-px w-2/3 bg-white/10 md:block" aria-hidden="true" />

          <div className="mt-6 grid gap-4 md:mt-0 md:grid-cols-3 md:pt-10">
            {divisions.map((d, i) => (
              <a
                key={d.id}
                href={`/#${d.id}`}
                className="group relative isolate block min-h-[15rem] overflow-hidden rounded-[1.5rem] border border-white/10"
              >
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/10" />
                <div className="flex h-full flex-col justify-end p-6">
                  <span className="font-mono text-xs text-electric-400">0{i + 1}</span>
                  <h3 className="mt-2 flex items-center justify-between text-2xl font-semibold tracking-tight">
                    {d.title}
                    <ArrowUpRight className="h-5 w-5 text-white/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{d.summary}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Values + facts ---------- */

export function Principles() {
  return (
    <section className="mesh-light py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <SectionLabel index="03">What we stand for</SectionLabel>
          <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-night-950 sm:text-6xl">
            How we work <span className="text-neutral-400">with partners.</span>
          </h2>
          <ol className="mt-10 divide-y divide-neutral-200">
            {values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="font-mono text-sm text-electric-700">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-night-950">{v.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-neutral-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="lg:pt-24">
          <div className="glass glass-edge rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-9 lg:sticky lg:top-28">
            <h3 className="text-lg font-semibold tracking-tight text-night-950">Company at a glance</h3>
            <dl className="mt-6 divide-y divide-neutral-200/80">
              <div className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 sm:pt-0.5">Founder</dt>
                <dd className="font-medium leading-snug text-night-950">{site.founder.name}</dd>
              </div>
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
    </section>
  );
}
