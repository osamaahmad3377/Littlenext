import Image from "next/image";
import { services } from "@/lib/site";
import { Spotlight } from "./fx";
import { Boat } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, Check, serviceIcons } from "./icons";
import { IconTile } from "./IconTile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const [importSvc, exportSvc, sourcingSvc, qualitySvc, logisticsSvc, customsSvc] = services;

function ServiceCard({ service, delay = 0 }: { service: (typeof services)[number]; delay?: number }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Reveal delay={delay} className="h-full">
      <Spotlight className="glass glass-edge group flex h-full gap-4 overflow-hidden rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgb(42_98_232/0.35)] sm:block sm:rounded-[1.75rem] sm:p-7">
        <IconTile icon={Icon} />
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-night-950 sm:mt-10 sm:text-xl">{service.title}</h3>
          <p className="mt-1.5 leading-relaxed text-slate-600 sm:mt-2.5">{service.text}</p>
        </div>
      </Spotlight>
    </Reveal>
  );
}

function ShipmentTracker() {
  const stages = ["Booked", "Loaded", "In transit", "Delivered"];
  return (
    <div className="glass-dark glass-edge rounded-2xl p-5" aria-hidden="true">
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
            <Boat size={14} weight="fill" aria-hidden="true" />
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
    <section id="services" className="mesh-light relative isolate overflow-hidden py-20 sm:py-36">
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

        <div className="mt-12 grid gap-3 sm:mt-14 sm:auto-rows-[minmax(15rem,auto)] sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {/* Import: large photo card */}
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <div className="group relative h-full min-h-[21rem] overflow-hidden rounded-[1.5rem] sm:min-h-[26rem] sm:rounded-[1.75rem] bg-night-900 text-white">
              <Image
                src="/images/warehouse.jpg"
                alt="Warehouse aisle with stocked shelves"
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover opacity-80 transition duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
              <div className="glass-dark glass-edge absolute inset-x-3 bottom-3 rounded-[1.25rem] p-6 sm:inset-x-4 sm:bottom-4 sm:rounded-[1.5rem] sm:p-8">
                <IconTile icon={ImportIcon} />
                <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{importSvc.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-white/75">{importSvc.text}</p>
              </div>
            </div>
          </Reveal>

          <ServiceCard service={exportSvc} delay={80} />
          <ServiceCard service={sourcingSvc} delay={160} />

          {/* Logistics: tracker card */}
          <Reveal className="sm:col-span-2" delay={80}>
            <div className="relative isolate flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] bg-night-950 p-5 text-white shadow-2xl shadow-night-950/20 sm:rounded-[1.75rem] sm:p-7">
              <div className="absolute -right-10 -top-16 -z-10 h-56 w-56 rounded-full bg-electric-500/30 blur-[70px]" aria-hidden="true" />
              <ShipmentTracker />
              <div className="flex items-start gap-4">
                <IconTile icon={LogisticsIcon} />
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
              className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-night-950 p-6 text-white shadow-2xl shadow-night-950/20 sm:rounded-[1.75rem] sm:p-9"
            >
              <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 animate-aurora rounded-full bg-electric-500/45 blur-[80px]" aria-hidden="true" />
              <div className="absolute -bottom-24 left-1/4 -z-10 h-56 w-56 animate-aurora rounded-full bg-amber-brand/20 blur-[80px] [animation-delay:-8s]" aria-hidden="true" />
              <svg className="absolute -right-10 -top-10 -z-10 h-64 w-64 text-white/10" viewBox="0 0 200 200" aria-hidden="true">
                {[40, 64, 88].map((r) => (
                  <circle key={r} cx="150" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.75" />
                ))}
              </svg>
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                <span className="h-px w-10 bg-gradient-to-r from-amber-brand to-amber-brand/0" />
                Not sure where to start?
              </p>
              <div className="mt-10 flex items-end justify-between gap-6">
                <h3 className="max-w-sm text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-3xl">
                  Tell us what you need and we&apos;ll map the route.
                </h3>
                <span className="btn-shine grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-night-950 shadow-[0_10px_30px_-8px_rgb(255_255_255/0.5)] transition duration-500 group-hover:scale-110">
                  <ArrowRight className="h-6 w-6 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
