// Decorative globe with animated trade routes between hubs.

const hubs = [
  { x: 150, y: 200 },
  { x: 318, y: 150 },
  { x: 372, y: 292 },
  { x: 205, y: 335 },
  { x: 262, y: 236 },
  { x: 118, y: 286 },
];

const routes = [
  "M150 200 Q236 96 318 150",
  "M318 150 Q392 206 372 292",
  "M262 236 Q300 330 205 335",
  "M118 286 Q170 232 262 236",
  "M205 335 Q300 390 372 292",
  "M150 200 Q190 250 262 236",
];

const parallels = [
  { dy: -140, rx: 143, ry: 16 },
  { dy: -70, rx: 187, ry: 22 },
  { dy: 0, rx: 200, ry: 26 },
  { dy: 70, rx: 187, ry: 22 },
  { dy: 140, rx: 143, ry: 16 },
];

export function Globe() {
  return (
    <svg viewBox="0 0 500 500" className="h-full w-full" role="img" aria-label="Globe showing trade routes between markets">
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#1d3a63" />
          <stop offset="60%" stopColor="#0f223f" />
          <stop offset="100%" stopColor="#06101d" />
        </radialGradient>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#f2b84b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f2b84b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="route" x1="0" x2="1">
          <stop offset="0%" stopColor="#f6cf83" />
          <stop offset="100%" stopColor="#e39f2a" />
        </linearGradient>
        <clipPath id="globe-clip">
          <circle cx="250" cy="250" r="200" />
        </clipPath>
      </defs>

      <circle cx="250" cy="250" r="245" fill="url(#globe-glow)" />

      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        <circle cx="250" cy="250" r="232" fill="none" stroke="#f2b84b" strokeOpacity="0.35" strokeDasharray="2 10" />
      </g>

      <circle cx="250" cy="250" r="200" fill="url(#globe-fill)" stroke="#ffffff" strokeOpacity="0.14" />

      <g clipPath="url(#globe-clip)" fill="none" stroke="#ffffff" strokeOpacity="0.09">
        {[200, 150, 95, 35].map((rx) => (
          <ellipse key={rx} cx="250" cy="250" rx={rx} ry="200" />
        ))}
        {parallels.map((p) => (
          <ellipse key={p.dy} cx="250" cy={250 + p.dy} rx={p.rx} ry={p.ry} />
        ))}
      </g>

      <g fill="none" stroke="url(#route)" strokeWidth="2" strokeLinecap="round">
        {routes.map((d, i) => (
          <g key={d}>
            <path d={d} strokeOpacity="0.25" />
            <path
              id={`route-${i}`}
              d={d}
              strokeDasharray="6 14"
              className="animate-dash"
              style={{ animationDelay: `${i * -0.5}s` }}
            />
          </g>
        ))}
      </g>

      {routes.map((_, i) => (
        <circle key={i} r="3.5" fill="#fff">
          <animateMotion dur={`${4 + i * 0.7}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#route-${i}`} />
          </animateMotion>
        </circle>
      ))}

      {hubs.map((h, i) => (
        <g key={i}>
          <circle cx={h.x} cy={h.y} r="5" fill="#f2b84b" fillOpacity="0.35">
            <animate attributeName="r" values="5;14;5" dur="3s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.4;0;0.4" dur="3s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={h.x} cy={h.y} r="4.5" fill="#f2b84b" stroke="#06101d" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}
