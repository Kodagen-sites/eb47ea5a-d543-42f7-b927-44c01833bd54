import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/ServiceCard";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import CardTiltLayer from "@/components/motion/CardTiltLayer";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operational Readiness Consulting for Startups, SMEs, and NGOs — process optimization, automation, organizational design, knowledge management, and investment readiness.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Operational Readiness Consulting for Startups, SMEs, and NGOs."
        image="/section-services.jpg"
        intro="Tailored consulting that strengthens your operational backbone — whatever your stage, size, or mission."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="max-w-2xl text-lg leading-relaxed text-slate">
              At SaharaOps, we help organizations build the systems, processes,
              and strategies they need to scale sustainably. Whether you're a
              fast-growing startup, an SME improving efficiency, or an NGO
              driving impact, we deliver practical solutions that unlock growth,
              resilience, and long-term success.
            </p>
          </FadeUp>

          <StaggerChildren
            staggerDelay={0.08}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {siteConfig.services.map((service) => (
              <CardTiltLayer key={service.slug} intensity={0.25} className="h-full">
                <ServiceCard service={service} />
              </CardTiltLayer>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-pad bg-ink text-paper">
        <div className="mx-auto max-w-shell px-5 text-center md:px-10">
          <FadeUp>
            <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(30px,4.4vw,58px)] font-light leading-[1.06] tracking-[-0.02em]">
              Not sure where to start?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-relaxed text-paper/60">
              Book a consultation today to discuss a tailored solution for your
              startup, SME, or NGO.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="mt-9">
              <MagneticButton
                as="a"
                href="/contact"
                className="inline-flex rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-charcoal"
              >
                Book a Consultation
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
