import Image from "next/image";
import { divisions } from "@/lib/site";
import { ArrowRight, Check } from "./icons";

const highlights = [
  { value: "3", label: "Specialised divisions" },
  { value: "Import & Export", label: "Both directions, one partner" },
  { value: "End-to-end", label: "From sourcing to delivery" },
  { value: "On request", label: "Sourcing beyond our core range" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-brand-50 via-white to-white"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent-400" />
              Import · Export · Global sourcing
            </p>
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] text-brand-950 sm:text-6xl lg:text-7xl">
              Your trusted partner in <span className="text-brand-500">global trade.</span>
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-slate-600">
              Littlenext is a parent company in international import and export. Through specialised divisions we source,
              ship and supply commodities, textiles and baby products — reliably and at scale.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700"
              >
                Start an enquiry
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#divisions"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Our divisions
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-brand-900 sm:mt-16">
          <Image
            src="/images/hero-port.jpg"
            alt="Aerial view of a busy container port with cranes and stacked cargo"
            width={2400}
            height={1350}
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/8] lg:aspect-[16/7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <ul className="flex flex-wrap gap-2">
              {divisions.map((d) => (
                <li key={d.id}>
                  <a
                    href={`#${d.id}`}
                    className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/25"
                  >
                    {d.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">End-to-end trade</p>
              <ol className="mt-3 flex items-center gap-3 text-sm font-medium text-slate-900">
                {["Sourced", "Inspected", "Shipped"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    {i > 0 && <span className="h-px w-5 bg-slate-300" />}
                    <span className="flex items-center gap-1.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-900 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-y-8 border-b border-slate-200 py-10 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div key={h.label} className={`flex flex-col-reverse justify-end px-1 ${i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}`}>
              <dt className="mt-1 text-sm text-slate-500">{h.label}</dt>
              <dd className="text-xl font-semibold tracking-tight text-brand-950 sm:text-2xl">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
