import { Contact } from "@/components/Contact";
import { Divisions } from "@/components/Divisions";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/fx";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { MobileCTA } from "@/components/MobileCTA";
import { Network } from "@/components/Network";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhyUs } from "@/components/WhyUs";
import { site } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: { "@type": "PostalAddress", addressCountry: "AU" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Showcase />
        <Divisions />
        <Services />
        <Network />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
