import Image from "next/image";
import { services } from "@/lib/site";
import { Spotlight } from "./fx";
import { ArrowRight, Check, serviceIcons, Ship } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const [importSvc, exportSvc, sourcingSvc, qualitySvc, logisticsSvc, customsSvc] = services;

function ServiceCard({ service, delay = 0 }: { service: (typeof services)[number]; delay?: number }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Reveal delay={delay} className="h-full">
      <Spotlight className="group h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-electric-300 hover:shadow-2xl hover:shadow-electric-500/10">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-night-950 transition duration-300 group-hover:bg-electric-500 group-hover:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mt-10 text-xl font-semibold tracking-tight text-night-950">{service.title}</h3>
        <p className="mt-2.5 leading-relaxed text-slate-600">{service.text}</p>
      </Spotlight>
    </Reveal>
  );
}

function ShipmentTracker() {
  const stages = ["Booked", "Loaded", "In transit", "Delivered"];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-white/50">SHIPMENT · LN-2048</p>
        <span className="flex items-center gap-1.5 rounded-full bg-electric-500/15 px-2.5 py-1 font-mono text-[11px] text-electric-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-400" />
          IN TRANSIT
        </span>
      </div>
      <div className="mt-6 flex items-center gap-3 text-sm">
        <span className="font-medium text-white">Origin</span>
        <div className="relative h-px flex-1 bg-gradient-to-r from-electric-400 via-electric-400/60 to-white/15">
          <span className="absolute -top-3 grid h-6 w-6 -translate-x-1/2 animate-travel place-items-center rounded-full bg-electric-500 text-white shadow-lg shadow-electric-500/40">
            <Ship className="h-3.5 w-3.5" />
          </span>
        </div>
        <span className="font-medium text-white/50">Destination</span>
      </div>
      <ol className="mt-6 grid grid-cols-4 gap-2">
        {stages.map((s, i) => (
          <li key={s} className="text-[11px] sm:text-xs">
            <span className={`block h-1 rounded-full ${i < 2 ? "bg-electric-400" : i === 2 ? "bg-electric-400/50" : "bg-white/10"}`} />
            <span className={`mt-2 flex items-center gap-1 ${i < 3 ? "text-white/80" : "text-white/35"}`}>
              {i < 2 && <Check className="h-3 w-3 text-electric-400" strokeWidth={3} />}
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Services() {
  const LogisticsIcon = serviceIcons[logisticsSvc.icon];
  const ImportIcon = serviceIcons[importSvc.icon];

  return (
    <section id="services" className="bg-slate-50 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Services"
          title={
            <>
              Everything between <span className="text-slate-400">supplier and shelf.</span>
            </>
          }
          text="Buying or selling across borders, we handle every step so you can focus on your business."
        />

        <div className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Import — large photo card */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[1.75rem] bg-night-900 text-white">
              <Image
                src="/images/warehouse.jpg"
                alt="Warehouse aisle with stocked shelves"
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover opacity-70 transition duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <ImportIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">{importSvc.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/75">{importSvc.text}</p>
              </div>
            </div>
          </Reveal>

          <ServiceCard service={exportSvc} delay={80} />
          <ServiceCard service={sourcingSvc} delay={160} />

          {/* Logistics — tracker card */}
          <Reveal className="sm:col-span-2" delay={80}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[1.75rem] bg-night-950 p-7 text-white">
              <ShipmentTracker />
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-electric-500">
                  <LogisticsIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{logisticsSvc.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-white/65">{logisticsSvc.text}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <ServiceCard service={qualitySvc} />
          <ServiceCard service={customsSvc} delay={80} />

          {/* CTA card */}
          <Reveal className="sm:col-span-2" delay={160}>
            <a
              href="#contact"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-electric-500 to-electric-600 p-7 text-white sm:p-9"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/20" aria-hidden="true" />
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-white/20" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Not sure where to start?</p>
              <div className="mt-10 flex items-end justify-between gap-6">
                <h3 className="max-w-sm text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Tell us what you need — we&apos;ll map the route.
                </h3>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-electric-600 transition group-hover:scale-110">
                  <ArrowRight className="h-6 w-6 -rotate-45 transition-transform group-hover:rotate-0" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
