import type { Metadata } from "next";
import framesManifest from "@/content/frames-manifest.json";
import { siteConfig } from "@/content/site-config";
import HomeHero from "@/components/sections/HomeHero";
import ValueProp from "@/components/sections/ValueProp";
import ServicesSection from "@/components/sections/ServicesSection";
import Showcase from "@/components/sections/Showcase";
import TypeStatement from "@/components/sections/TypeStatement";
import ProcessSection from "@/components/sections/ProcessSection";
import StatsSection from "@/components/sections/StatsSection";
import Testimonials from "@/components/sections/Testimonials";
import PrinciplesMarquee from "@/components/sections/PrinciplesMarquee";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Operations Consulting for Growth-Stage Companies",
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.company.name,
  description: siteConfig.company.description,
  url: siteConfig.seo.siteUrl,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  areaServed: "Worldwide",
  sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeHero
        frameCount={framesManifest.frameCount}
        frameDir={framesManifest.frameDir}
        fallbackImage="/hero-still.jpg"
      />
      <ValueProp />
      <ServicesSection />
      <Showcase />
      <TypeStatement />
      <ProcessSection />
      <StatsSection />
      <Testimonials />
      <PrinciplesMarquee />
      <CtaSection />
    </>
  );
}
