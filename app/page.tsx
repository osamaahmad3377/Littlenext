import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About, Divisions, Process, Services, Ticker, WhyUs } from "@/components/Sections";
import { site } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Divisions />
        <Services />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
