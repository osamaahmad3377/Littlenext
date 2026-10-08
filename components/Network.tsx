import { regions, site } from "@/lib/site";
import { landDots, MAP_H, MAP_W, project } from "@/lib/worldDots";
import { Globe3D } from "./Globe3D";
import { ArrowRight, Box, Globe, Ship } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const points = regions.map((r) => project(r.lon, r.lat));
const hqIndex = Math.max(0, regions.findIndex((r) => r.hq));
const hq = regions[hqIndex];
const [hx, hy] = points[hqIndex];

// One lane from headquarters to every other region
const lanes = regions
  .map((r, i) => ({ region: r, i }))
  .filter(({ i }) => i !== hqIndex)
  .map(({ region, i }) => {
    const [x, y] = points[i];
    const dist = Math.hypot(x - hx, y - hy);
    const cx = (x + hx) / 2;
    const cy = Math.max(10, Math.min(y, hy) - dist * 0.32);
    return { name: region.name, d: `M${hx.toFixed(1)} ${hy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}` };
  });

const modes = [
  { icon: Ship, title: "Sea freight", text: "FCL and LCL container shipping for bulk and volume orders." },
  { icon: Globe, title: "Air freight", text: "Fast, secure delivery for urgent and high-value goods." },
  { icon: Box, title: "Land & last mile", text: "Road transport, warehousing and door-to-door delivery." },
];

function FlatMap() {
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-label={`World map with trade lanes from ${hq.name} to ${lanes.map((l) => l.name).join(", ")}`}>
        <defs>
          <linearGradient id="lane" x1="0" x2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#8ab6ff" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        <path d={landDots} stroke="#ffffff" strokeOpacity="0.17" strokeWidth="2.4" strokeLinecap="round" />

        <g fill="none" stroke="url(#lane)" strokeWidth="1.5" strokeLinecap="round">
          {lanes.map((l, i) => (
            <g key={l.name}>
              <path d={l.d} strokeOpacity="0.2" />
              <path id={`lane-${i}`} d={l.d} strokeDasharray="4 11" className="animate-dash" />
            </g>
          ))}
        </g>

        {lanes.map((l, i) => (
          <circle key={l.name} r="2.6" fill="#fff">
            <animateMotion dur={`${4.5 + (i % 4) * 0.8}s`} begin={`${i * -0.7}s`} repeatCount="indefinite">
              <mpath href={`#lane-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {points.map(([x, y], i) => {
          const isHq = i === hqIndex;
          const color = isHq ? "#fbbf24" : "#3b7bff";
          return (
            <g key={regions[i].name}>
              <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.35">
                <animate attributeName="r" values={isHq ? "6;22;6" : "4;13;4"} dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0;0.5" dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={isHq ? 6.5 : 4} fill={isHq ? "#fbbf24" : "#fff"} stroke={isHq ? "#03060d" : color} strokeWidth={isHq ? 2.5 : 2.2} />
            </g>
          );
        })}
      </svg>

      {regions.map((r, i) => {
        const [x, y] = points[i];
        return (
          <span
            key={r.name}
            className={`absolute -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur ${
              r.hq
                ? "translate-y-3.5 border-amber-brand/50 bg-amber-brand font-semibold text-night-950"
                : `border-white/10 bg-night-950/75 text-white/80 ${r.labelAbove ? "-translate-y-[calc(100%+0.6rem)]" : "translate-y-2.5"}`
            }`}
            style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
          >
            {r.hq ? `HQ · ${r.name}` : r.name}
          </span>
        );
      })}
    </div>
  );
}

export function Network() {
  return (
    <section id="network" className="relative isolate overflow-hidden bg-night-950 py-20 text-white sm:py-36">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/20 blur-[160px]" />
      <div className="absolute -right-32 top-24 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          index="04"
          label="Network"
          title={
            <>
              From {hq.name} <span className="text-white/40">to the world.</span>
            </>
          }
          text={`Headquartered in ${site.country}, we connect suppliers and buyers across Asia, the Middle East, Europe, Africa and the Americas, and manage every leg of the journey.`}
        />

        <Reveal className="mt-12 sm:mt-14">
          <div className="glass-dark glass-edge overflow-hidden rounded-[2rem]">
            {/* Phones and tablets: interactive 3D globe */}
            <div className="relative px-2 pt-4 lg:hidden">
              <div className="mx-auto max-w-[30rem]">
                <Globe3D />
              </div>
              <p className="flex items-center justify-center gap-2 border-t border-white/10 py-3.5 font-mono text-[11px] uppercase tracking-wider text-white/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-brand" />
                Drag to rotate the globe
              </p>
            </div>

            {/* Desktop: flat map */}
            <div className="hidden p-8 lg:block">
              <FlatMap />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4 sm:mt-5">
          <div className="glass-dark glass-edge rounded-[1.75rem] p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Trade lanes from {hq.name}</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:flex lg:flex-wrap">
              {lanes.map((l) => (
                <li
                  key={l.name}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm text-white/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-brand" />
                  <span className="text-white/55">{hq.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-electric-300" />
                  <span className="truncate">{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-5 md:grid-cols-3">
          {modes.map((m, i) => (
            <Reveal key={m.title} delay={i * 90}>
              <div className="glass-dark glass-edge flex h-full items-start gap-4 rounded-[1.5rem] p-5 sm:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-400 to-electric-600 text-white shadow-lg shadow-electric-600/30">
                  <m.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
