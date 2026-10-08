import Image from "next/image";
import { site, values } from "@/lib/site";
import { ArrowRight, Chat, Doc, Shield, Clock } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const valueIcons = [Chat, Shield, Doc, Clock];

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
                <div className="glass-dark glass-edge group flex h-full gap-4 rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] sm:block sm:rounded-[1.75rem] sm:p-8">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-400 to-electric-600 text-white shadow-lg shadow-electric-600/30 transition group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold sm:mt-12">{v.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-white/55 sm:mt-2">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 sm:rounded-[2.25rem]">
            <Image src="/images/airport-sunset.jpg" alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/70 via-night-950/30 to-transparent" />
            <div className="absolute -left-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-electric-500/30 blur-[100px]" />
            <div className="glass-dark glass-edge m-3 max-w-2xl rounded-[1.5rem] px-6 py-10 sm:m-8 sm:rounded-[1.75rem] sm:px-12 sm:py-14 lg:m-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-300">Ready when you are</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
                Let&apos;s move your next shipment.
              </h2>
              <p className="mt-5 text-lg text-white/70">
                Share your requirement and our team will come back with options and a clear quotation.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-night-950 transition hover:bg-electric-300"
                >
                  Get a quote
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Email our team
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
