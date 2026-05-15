import { siteConfig } from "@/content/site-config";
import StickyScrollSection from "@/components/motion/StickyScrollSection";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Section 6 — Process. Pinned image left, scrolling steps right.
 * Tone: paper white.
 */
export default function ProcessSection() {
  const { eyebrow, heading, image, steps } = siteConfig.process;

  return (
    <section className="section-pad bg-paper">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(32px,4.4vw,58px)] font-light leading-[1.04] tracking-[-0.02em] text-charcoal">
            {heading}
          </h2>
        </FadeUp>

        <div className="mt-14">
          <StickyScrollSection
            stickyOffset="top-28"
            sticky={
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cloud bg-mist">
                <img
                  src={image}
                  alt="The SaharaOps operating method"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
              </div>
            }
            scrolling={
              <div className="flex flex-col gap-12 md:gap-20">
                {steps.map((step) => (
                  <div key={step.index} className="border-t border-cloud pt-7">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                      {step.index}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-medium text-charcoal md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
