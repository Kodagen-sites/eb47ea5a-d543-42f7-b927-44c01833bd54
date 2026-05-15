import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import ServiceCard from "@/components/ServiceCard";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import CardTiltLayer from "@/components/motion/CardTiltLayer";
import { ArrowRight } from "lucide-react";

/**
 * Section 3 — Services grid. Stagger-revealed, tilt-reactive cards with
 * parallax thumbnails. Tone: mist.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="section-pad bg-mist">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="eyebrow text-accent">What we do</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(32px,4.4vw,58px)] font-light leading-[1.04] tracking-[-0.02em] text-charcoal">
                Six engagements, one outcome.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.16}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent"
            >
              All services <ArrowRight size={14} />
            </Link>
          </FadeUp>
        </div>

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
  );
}
