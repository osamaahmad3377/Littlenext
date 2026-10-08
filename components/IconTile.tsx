import type { Icon } from "@phosphor-icons/react";

const sizes = {
  sm: { tile: "h-11 w-11 rounded-[0.85rem]", icon: 23 },
  md: { tile: "h-14 w-14 rounded-[1.05rem]", icon: 29 },
  lg: { tile: "h-16 w-16 rounded-[1.2rem]", icon: 33 },
} as const;

/** Premium "jewel" tile: deep navy body, gradient rim, top gloss, soft glow, duotone icon. */
export function IconTile({ icon: Glyph, size = "md", className = "" }: { icon: Icon; size?: keyof typeof sizes; className?: string }) {
  const s = sizes[size];
  return (
    <span className={`icon-tile grid shrink-0 place-items-center ${s.tile} ${className}`}>
      <Glyph size={s.icon} weight="duotone" className="icon-glyph relative z-10 text-white" aria-hidden="true" />
    </span>
  );
}

/**
 * Large faint icon watermark for a card background. The card needs `relative isolate overflow-hidden`
 * and the `group` class for the hover drift.
 */
export function BgIcon({ icon: Glyph, tone = "light", size = 168 }: { icon: Icon; tone?: "light" | "dark"; size?: number }) {
  return (
    <Glyph
      size={size}
      weight="duotone"
      aria-hidden="true"
      className={`bg-icon pointer-events-none absolute -bottom-[24%] -right-[13%] -z-10 rotate-[-12deg] transition duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-4deg] ${
        tone === "light" ? "text-electric-500/[0.09] group-hover:text-electric-500/[0.16]" : "text-white/[0.06] group-hover:text-electric-300/[0.14]"
      }`}
    />
  );
}
