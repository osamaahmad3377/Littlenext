import { site, values } from "@/lib/site";
import { Handshake, Receipt, ShieldCheck, Timer } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "./icons";
import { BgIcon } from "./BgIcon";
import { LogoMark } from "./Logo";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const valueIcons = [Handshake, ShieldCheck, Receipt, Timer];

export function WhyUs() {
  return (
    <section id="why" className="relative isolate overflow-hidden bg-night-950 py-20 text-white sm:py-36">
      <div className="absolute -left-40 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-electric-600/25 blur-[140px]" />
      <div className="absolute -right-32 bottom-1/3 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          index="06"
          label={`Why ${site.name}`}
          title={
            <>
              A partner you can <span className="text-white/40">build on.</span>
            </>
          }
          text="International trade has a lot of moving parts. We keep them moving in the right direction."
        />

        <div className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <Reveal key={v.title} delay={i * 90} className="h-full">
                <div className="glass-dark glass-edge group relative isolate block h-full min-h-[10rem] overflow-hidden rounded-[1.5rem] p-6 sm:min-h-[14rem] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] sm:rounded-[1.75rem] sm:p-8">
                  <BgIcon icon={Icon} tone="dark" />
                  <div className="max-w-[85%]">
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-white/55 sm:mt-2">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-night-900 sm:rounded-[2.25rem]">
            {/* Drifting aurora behind the glass panel */}
            <div className="absolute -left-[10%] -top-1/3 -z-10 h-[34rem] w-[34rem] animate-aurora rounded-full bg-electric-500/45 blur-[110px]" />
            <div className="absolute -bottom-1/3 right-[-5%] -z-10 h-[30rem] w-[30rem] animate-aurora rounded-full bg-cyan-400/30 blur-[110px] [animation-delay:-6s]" />
            <div className="absolute left-1/3 top-1/4 -z-10 h-72 w-72 animate-aurora rounded-full bg-amber-brand/25 blur-[100px] [animation-delay:-12s]" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

            <div className="grid items-center gap-8 p-3 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:p-12">
              <div className="glass-dark glass-edge rounded-[1.5rem] px-6 py-10 sm:rounded-[1.75rem] sm:px-12 sm:py-14">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-300">Ready when you are</p>
                <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                  Let&apos;s move your next shipment.
                </h2>
                <p className="mt-5 text-lg text-white/70">
                  Share your requirement and our team will come back with options and a clear quotation.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Magnetic>
                    <a
                      href="#contact"
                      className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-night-950 shadow-[0_10px_40px_-10px_rgb(255_255_255/0.45)] transition hover:bg-electric-300"
                    >
                      Get a quote
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                    >
                      Email our team
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Brand mark floating in the aurora (desktop) */}
              <div className="hidden justify-center lg:flex" aria-hidden="true">
                <div className="glass-dark glass-edge grid h-56 w-56 place-items-center rounded-[3rem] shadow-[0_40px_80px_-30px_rgb(59_123_255/0.6)]">
                  <LogoMark className="h-28 w-28 drop-shadow-[0_20px_30px_rgb(59_123_255/0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
