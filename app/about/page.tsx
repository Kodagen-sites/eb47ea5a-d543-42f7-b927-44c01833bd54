import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "SaharaOps is an Operational Readiness consultancy helping Startups, SMEs, and NGOs build the systems, processes, and strategies they need to scale sustainably.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Cross-sector expertise",
    body: "From fast-moving startups to established SMEs and mission-driven NGOs — we bring patterns that work across every stage and structure.",
  },
  {
    title: "Global perspective",
    body: "Experience across four continents — Africa, the Middle East, Europe, and Asia — adapting strategies to local realities.",
  },
  {
    title: "Proven results",
    body: "Documented success in process optimization, scaling, and investor readiness — measured in time saved, costs reduced, and funding unlocked.",
  },
  {
    title: "Tailored solutions",
    body: "We don't just advise; we design and help implement strategies that work for your organization, your stage, and your mission.",
  },
];

const TIMELINE = [
  {
    year: "The founder",
    body: "SaharaOps is led by Chisobem Nwokedi — a certified Agile professional, PMP, and Scrum Product Owner with deep expertise in operational readiness, process improvement, and organizational growth.",
  },
  {
    year: "The work",
    body: "Partnering with founders, executives, and nonprofit leaders to drive operational excellence — across high-growth startups, established SMEs, and international NGO projects including UN WTC–backed programmes.",
  },
  {
    year: "Global reach",
    body: "A remote practice working with teams across Africa, the Middle East, Europe, and Asia — holding the operating seat until the systems can stand on their own.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SaharaOps"
        title="Sustainable growth is built on a strong operational foundation."
        image="/section-about.jpg"
        intro="We specialize in Operational Readiness Consulting — helping Startups, SMEs, and NGOs streamline processes, build resilience, and position themselves for growth and impact."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-5 md:grid-cols-[1fr_1.2fr] md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">Who we are</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                At SaharaOps, we believe that sustainable growth is built on a
                strong operational foundation. Too often, organizations —
                whether startups, SMEs, or NGOs — move fast but without the
                systems and structures needed to scale efficiently.
              </p>
              <p>
                <span className="text-charcoal">That's where we come in.</span>{" "}
                We specialize in Operational Readiness Consulting — helping
                organizations streamline processes, build resilience, and
                position themselves for growth and impact. From process
                optimization and automation to investor readiness, knowledge
                management, and organizational design, we provide practical
                solutions that deliver measurable results.
              </p>
              <p className="border-l-2 border-accent pl-5 text-charcoal">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Our mission
                </span>
                <br />
                To empower organizations to achieve clarity, efficiency, and
                resilience by building the operational systems that support
                growth, innovation, and impact.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">What makes us different</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(30px,4vw,52px)] font-light leading-[1.06] tracking-[-0.02em] text-charcoal">
              Why organizations choose SaharaOps.
            </h2>
          </FadeUp>
          <StaggerChildren
            staggerDelay={0.1}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-cloud bg-paper p-7 md:p-8"
              >
                <h3 className="font-display text-2xl font-medium text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">
                  {v.body}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">Our experience</p>
          </FadeUp>
          <div className="mt-10 space-y-0">
            {TIMELINE.map((t, i) => (
              <FadeUp key={t.year} delay={i * 0.08}>
                <div className="grid gap-3 border-t border-cloud py-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                    {t.year}
                  </span>
                  <p className="max-w-2xl text-lg leading-relaxed text-slate">
                    {t.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink text-paper">
        <div className="mx-auto max-w-shell px-5 text-center md:px-10">
          <FadeUp>
            <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(30px,4.4vw,58px)] font-light leading-[1.06] tracking-[-0.02em]">
              Ready to build your operational backbone?
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
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
          <p className="mt-6 text-sm text-paper/45">
            Or explore the{" "}
            <Link href="/services" className="text-accent underline">
              full range of services
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
