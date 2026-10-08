import type { Icon } from "@phosphor-icons/react";

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
        tone === "light" ? "text-electric-500/[0.13] group-hover:text-electric-500/[0.22]" : "text-white/[0.09] group-hover:text-electric-300/[0.2]"
      }`}
    />
  );
}
