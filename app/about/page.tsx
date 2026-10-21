import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/fx";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Founder, Principles, Purpose, StoryHero } from "@/components/Story";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our story",
  description: `${site.name} is an Australian-based parent company in international import and export, founded by ${site.founder.name} in Melbourne, Victoria.`,
  alternates: { canonical: "/about" },
};

const founderJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${site.url}/about`,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
    address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }} />
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="main">
        <StoryHero />
        <Founder />
        <Purpose />
        <Principles />
        <Contact index="04" />
      </main>
      <Footer />
      <MobileCTA />
      <WhatsAppChat />
    </>
  );
}
