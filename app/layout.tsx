import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Import & Export of Commodities, Textiles and Baby Products`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Australian import export company",
    "import export company Australia",
    "commodities trading",
    "textile export",
    "baby products wholesale",
    "global sourcing",
    site.name,
  ],
  openGraph: {
    type: "website",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before React loads */}
      <body className="font-sans" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-900"
        >
          Skip to content
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
