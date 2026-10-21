import Image from "next/image";
import { site } from "@/lib/site";

/** The LN mark from the brand logo. Dark-background version by default; pass `onLight` for white backgrounds. */
export function LogoMark({ className = "h-9 w-9", onLight = false }: { className?: string; onLight?: boolean }) {
  return (
    <Image
      src={onLight ? "/images/logo-mark.png" : "/images/logo-mark-dark.png"}
      alt=""
      width={193}
      height={184}
      className={`object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark onLight={!light} className="h-9 w-9" />
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
