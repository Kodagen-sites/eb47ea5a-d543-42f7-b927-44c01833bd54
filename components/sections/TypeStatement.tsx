import { siteConfig } from "@/content/site-config";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Section 5 — Type statement. Mission sentence on a pale accent ground.
 * Tone: accent-soft.
 */
export default function TypeStatement() {
  const { eyebrow, statement } = siteConfig.typeStatement;
  return (
    <section className="section-pad bg-accent-soft">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-accent-deep">{eyebrow}</p>
        </FadeUp>
        <TextReveal
          as="h2"
          className="mt-7 max-w-[24ch] font-display text-[clamp(26px,3.8vw,52px)] font-light leading-[1.16] tracking-[-0.015em] text-accent-deep"
        >
          {statement}
        </TextReveal>
      </div>
    </section>
  );
}
