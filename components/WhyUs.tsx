import { site, values } from "@/lib/site";
import { EnvelopeSimple, Handshake, Phone, Receipt, ShieldCheck, Timer, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, ArrowUpRight } from "./icons";
import { BgIcon } from "./BgIcon";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const valueIcons = [Handshake, ShieldCheck, Receipt, Timer];

const channels = [
  { icon: Phone, label: "Call us", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`, external: false },
  ...(site.contact.whatsapp
    ? [{ icon: WhatsappLogo, label: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${site.contact.whatsapp}`, external: true }]
    : []),
  { icon: EnvelopeSimple, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, external: false },
];

export function WhyUs() {
  return (
    <section id="why" className="relative isolate overflow-hidden bg-night-950 py-20 text-white sm:py-28 lg:py-32">
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
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-500 to-transparent" aria-hidden="true" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden="true" />
            <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-electric-500/[0.12] blur-[100px]" aria-hidden="true" />

            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:p-14">
              <div>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/55">
                  <span className="h-px w-10 bg-gradient-to-r from-electric-500 to-electric-500/0" />
                  Ready when you are
                </p>
                <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-6xl">
                  Let&apos;s move your <span className="text-electric-500">next shipment.</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                  Share your requirement and our Melbourne team will come back with options and a clear quotation.
                </p>
                <div className="mt-9">
                  <Magnetic>
                    <a
                      href="#contact"
                      className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-night-950 transition hover:bg-electric-300"
                    >
                      Get a quote
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Direct contact options */}
              <ul className="glass-dark glass-edge divide-y divide-white/10 rounded-[1.5rem] p-2">
                {channels.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition hover:bg-white/[0.06]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-electric-400 transition group-hover:border-electric-500/60 group-hover:bg-electric-500 group-hover:text-night-950">
                        <Icon size={20} weight="duotone" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{label}</span>
                        <span className="block truncate font-medium text-white">{value}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
