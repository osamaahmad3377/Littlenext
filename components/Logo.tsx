import { site } from "@/lib/site";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ln-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-electric-400)" />
          <stop offset="100%" stopColor="var(--color-electric-600)" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#ln-mark)" />
      <path
        d="M12 10v19h11"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 21 29 11M22.5 11H29v6.5"
        fill="none"
        stroke="var(--color-amber-brand)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-lg tracking-tight ${light ? "text-white" : "text-night-950"}`}>
        {(() => {
          const [first, ...rest] = site.name.split(" ");
          return (
            <>
              <span className="font-medium">{first}</span> <span className="font-bold">{rest.join(" ")}</span>
            </>
          );
        })()}
      </span>
    </span>
  );
}
