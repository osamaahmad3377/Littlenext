import { site } from "@/lib/site";

/**
 * LN mark: the L in ink (black on light, white on dark). The orange N starts inside the L's corner (where the original
 * arrow logo's arrow began), rises, dips, and its last stroke shoots up-right as the arrow.
 * Geometry lives in one place so the favicon and share image (scripts in README) can match it.
 */
export const MARK_VIEWBOX = "0 0 84 84";
export const MARK_ORANGE = "#FF8F4E";

export function LogoMark({ className = "h-9 w-auto", onLight = false }: { className?: string; onLight?: boolean }) {
  const ink = onLight ? "#050505" : "#FFFFFF";
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={9}>
        <path d="M17 13V69H55" stroke={ink} />
        <path d="M34 56V26L50 52L71 17" stroke={MARK_ORANGE} />
        <path d="M58 17H71V30" stroke={MARK_ORANGE} />
      </g>
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark onLight={!light} className="h-8 w-auto" />
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
      <LogoMark className="h-[70%] w-auto" />
    </span>
  );
}
