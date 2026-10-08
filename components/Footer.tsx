import { divisions, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed">{site.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Company</h3>
            <ul className="mt-5 space-y-3">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition hover:text-gold-400">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Divisions</h3>
            <ul className="mt-5 space-y-3">
              {divisions.map((d) => (
                <li key={d.id}>
                  <a href={`#${d.id}`} className="transition hover:text-gold-400">
                    {d.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Get in touch</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition hover:text-gold-400">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} className="transition hover:text-gold-400">
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-ink-500">Import · Export · Global sourcing</p>
        </div>
      </div>
    </footer>
  );
}
