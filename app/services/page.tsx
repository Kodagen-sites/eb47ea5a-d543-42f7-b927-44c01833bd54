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
    "Operational diagnostics, process architecture, revenue operations, org design, embedded implementation, and fractional COO leadership — the SaharaOps engagement range.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six ways to make the system carry the weight."
        image="/section-services.jpg"
        intro="Each engagement stands alone — and each one leaves behind operations the company can run without us."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="max-w-2xl text-lg leading-relaxed text-slate">
              We scope every engagement to the moment the company is in. Start
              with a diagnostic, or go straight to the system that is straining
              hardest. The work compounds either way.
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
              Not sure which engagement you need?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-[480px] text-[15px] leading-relaxed text-paper/60">
              Book a consultation. We will walk through where your operations
              are straining and recommend the right place to start.
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
