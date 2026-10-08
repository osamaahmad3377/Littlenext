import { divisions, site } from "@/lib/site";
import { ArrowUp } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const columns = [
    { title: "Company", links: [...site.nav, { label: "Contact", href: "#contact" }] },
    { title: "Divisions", links: divisions.map((d) => ({ label: d.title, href: `#${d.id}` })) },
  ];

  return (
    <footer className="relative overflow-hidden bg-night-950 text-white/60">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-xs leading-relaxed">{site.description}</p>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Get in touch</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} className="transition hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
            <span className="mt-1 block text-white/40 sm:ml-3 sm:mt-0 sm:inline">Based in {site.country} · Trading worldwide</span>
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 transition hover:text-white">
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition group-hover:-translate-y-0.5 group-hover:border-white/40">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] select-none text-center text-[21vw] font-bold leading-none tracking-[-0.06em] bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-transparent"
      >
        {site.name.toLowerCase()}
      </p>
    </footer>
  );
}
