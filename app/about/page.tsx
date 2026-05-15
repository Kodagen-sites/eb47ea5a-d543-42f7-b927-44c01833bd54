import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import PageHero from "@/components/sections/PageHero";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "SaharaOps is an operations consultancy that designs and embeds the operating systems growth-stage companies need to scale without breaking.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Evidence before opinion",
    body: "We diagnose how the company actually runs before we recommend a single change. The roadmap is earned, not assumed.",
  },
  {
    title: "Embedded, not advisory",
    body: "We stay in the room through rollout — running meetings, building tooling, coaching owners — until the change holds on its own.",
  },
  {
    title: "Systems outlast people",
    body: "Heroics do not scale. We leave behind documented, instrumented operations that keep working when the team turns over.",
  },
  {
    title: "Quiet by design",
    body: "Good operations are felt, not seen. Our measure of success is a company that simply runs — calmly, predictably, at speed.",
  },
];

const TIMELINE = [
  { year: "The brief", body: "Founders kept asking the same question: growth is here, why does everything feel harder? SaharaOps was built to answer it." },
  { year: "The method", body: "Four moves — diagnose, design, embed, compound — refined across operations, revenue, and org engagements." },
  { year: "Today", body: "A remote practice working with growth-stage teams worldwide, holding the operating seat until the system can stand alone." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SaharaOps"
        title="We make operations the quietest part of the company."
        image="/section-about.jpg"
        intro="An operations consultancy for the stage where growth starts to outrun the systems that created it."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-5 md:grid-cols-[1fr_1.2fr] md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">Why we exist</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p>
                Every growing company hits the same wall. The improvisation that
                got it off the ground — the shared instinct, the founder in every
                decision, the workarounds nobody wrote down — stops scaling. Work
                gets done twice. Handoffs drop. The calendar fills with meetings
                about meetings.
              </p>
              <p>
                <span className="text-charcoal">SaharaOps exists for that moment.</span>{" "}
                We design and embed the operating systems that let a company keep
                its speed while it grows up — processes that hold their shape, a
                pipeline everyone agrees on, a structure built for the next stage
                rather than the last one.
              </p>
              <p>
                We are deliberately not a slideware firm. We work inside the
                business, alongside the people who will run the result, and we
                leave when they no longer need us.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">How we think</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(30px,4vw,52px)] font-light leading-[1.06] tracking-[-0.02em] text-charcoal">
              Four convictions behind every engagement.
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
            <p className="eyebrow text-accent">The practice</p>
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
              See whether the method fits your company.
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
              full range of engagements
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
