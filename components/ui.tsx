import { Reveal } from "./Reveal";

export function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] ${light ? "text-white/55" : "text-slate-500"}`}>
      <span className={light ? "text-electric-400" : "text-electric-600"}>{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-amber-brand to-amber-brand/0" />
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  text,
  light = false,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
      <div>
        <SectionLabel index={index} light={light}>
          {label}
        </SectionLabel>
        <h2
          className={`mt-5 overflow-hidden pb-[0.06em] text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl ${
            light ? "text-white" : "text-night-950"
          }`}
        >
          <span className="reveal-line">{title}</span>
        </h2>
      </div>
      {text && (
        <p className={`max-w-md text-lg leading-relaxed lg:justify-self-end ${light ? "text-white/60" : "text-slate-600"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}
