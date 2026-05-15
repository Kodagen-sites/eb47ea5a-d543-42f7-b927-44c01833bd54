import { siteConfig } from "@/content/site-config";
import TextReveal from "@/components/motion/TextReveal";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Section 2 — Value proposition. Oversized type, word-by-word reveal.
 * Tone: paper white.
 */
export default function ValueProp() {
  const { eyebrow, statement } = siteConfig.valueProp;
  return (
    <section className="section-pad bg-paper">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-accent">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-accent/50" />
            {eyebrow}
          </p>
        </FadeUp>
        <TextReveal
          as="h2"
          className="mt-8 max-w-[20ch] font-display text-[clamp(30px,4.6vw,62px)] font-light leading-[1.08] tracking-[-0.02em] text-charcoal"
        >
          {statement}
        </TextReveal>
      </div>
    </section>
  );
}
