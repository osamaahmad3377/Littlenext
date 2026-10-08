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
