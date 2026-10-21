import { site } from "@/lib/site";

/**
 * LN mark: the L in ink (black on light, white on dark) and an orange N whose last stroke rises into an arrow.
 * Geometry lives in one place so the favicon and share image (scripts in README) can match it.
 */
export const MARK_VIEWBOX = "0 0 114 84";
export const MARK_ORANGE = "#FF8F4E";

export function LogoMark({ className = "h-9 w-auto", onLight = false }: { className?: string; onLight?: boolean }) {
  const ink = onLight ? "#050505" : "#FFFFFF";
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={11}>
        <path d="M12 14V70H40" stroke={ink} />
        <path d="M54 70V14L80 50L104 14" stroke={MARK_ORANGE} />
        <path d="M88 14H104V30" stroke={MARK_ORANGE} />
      </g>
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark onLight={!light} className="h-7 w-auto" />
      <span className={`text-lg tracking-tight ${light ? "text-white" : "text-night-950"}`}>
        <span className="font-medium">{first}</span> <span className="font-bold">{rest.join(" ")}</span>
      </span>
    </span>
  );
}

/** Square app-icon style tile, used in small badges. */
export function LogoTile({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl border border-white/10 bg-night-950 ${className}`}>
      <LogoMark className="h-[45%] w-auto" />
    </span>
  );
}
