import { lanes, regions } from "@/lib/site";
import { landDots, MAP_H, MAP_W, project } from "@/lib/worldDots";
import { Box, Globe, Ship } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const points = regions.map((r) => project(r.lon, r.lat));

const arcs = lanes.map(([a, b]) => {
  const [x1, y1] = points[a];
  const [x2, y2] = points[b];
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - dist * 0.28;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
});

const modes = [
  { icon: Ship, title: "Sea freight", text: "FCL & LCL container shipping for bulk and volume orders." },
  { icon: Globe, title: "Air freight", text: "Fast, secure delivery for urgent and high-value goods." },
  { icon: Box, title: "Land & last mile", text: "Road transport, warehousing and door-to-door delivery." },
];

export function Network() {
  return (
    <section id="network" className="relative isolate overflow-hidden bg-night-950 py-24 text-white sm:py-36">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-600/15 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          index="04"
          label="Network"
          title={
            <>
              Connecting markets <span className="text-white/40">across continents.</span>
            </>
          }
          text="We link suppliers and buyers along the trade lanes that matter to your business — and manage every leg of the journey."
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-night-900/60 p-3 sm:p-8">
            <div className="relative">
              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-label="World map with trade lanes between regions">
                <defs>
                  <linearGradient id="lane" x1="0" x2="1">
                    <stop offset="0%" stopColor="#8ab6ff" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>
                <path d={landDots} stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2.6" strokeLinecap="round" />

                <g fill="none" stroke="url(#lane)" strokeWidth="1.6" strokeLinecap="round">
                  {arcs.map((d, i) => (
                    <g key={i}>
                      <path d={d} strokeOpacity="0.2" />
                      <path id={`lane-${i}`} d={d} strokeDasharray="4 12" className="animate-dash" />
                    </g>
                  ))}
                </g>

                {arcs.map((_, i) => (
                  <circle key={i} r="3" fill="#fff">
                    <animateMotion dur={`${5 + (i % 4)}s`} begin={`${i * -0.9}s`} repeatCount="indefinite">
                      <mpath href={`#lane-${i}`} />
                    </animateMotion>
                  </circle>
                ))}

                {points.map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="#3b7bff" fillOpacity="0.35">
                      <animate attributeName="r" values="5;16;5" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="fill-opacity" values="0.45;0;0.45" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                    <circle cx={x} cy={y} r="4.5" fill="#fff" stroke="#3b7bff" strokeWidth="2.5" />
                  </g>
                ))}
              </svg>

              {regions.map((r, i) => {
                const [x, y] = points[i];
                return (
                  <span
                    key={r.name}
                    className={`absolute hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-night-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/75 backdrop-blur sm:block ${r.labelAbove ? "-translate-y-[calc(100%+0.75rem)]" : "translate-y-3"}`}
                    style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
                  >
                    {r.name}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {modes.map((m, i) => (
            <Reveal key={m.title} delay={i * 90}>
              <div className="flex h-full items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-electric-300">
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
