import { site } from "@/lib/site";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--color-gold-400)" />
      <path
        d="M12 10v19h11"
        fill="none"
        stroke="var(--color-ink-950)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 21 29 11M22.5 11H29v6.5"
        fill="none"
        stroke="var(--color-ink-950)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-xl tracking-tight ${dark ? "text-ink-900" : "text-white"}`}>
        <span className="font-medium">{site.name.slice(0, 6)}</span>
        <span className="font-extrabold">{site.name.slice(6)}</span>
      </span>
    </span>
  );
}
