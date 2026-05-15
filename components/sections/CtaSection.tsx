import { siteConfig } from "@/content/site-config";
import CanvasAtmosphere from "@/components/motion/CanvasAtmosphere";
import MagneticButton from "@/components/motion/MagneticButton";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Section 10 — Closing CTA. Canvas atmosphere behind oversized type.
 * Tone: ink (dark) + drifting particle field.
 */
export default function CtaSection() {
  const { eyebrow, heading, body, ctaLabel, ctaHref } = siteConfig.cta;

  return (
    <section className="relative overflow-hidden bg-ink">
      <CanvasAtmosphere
        mode="drift"
        bgColor="#0E1117"
        color="rgba(255,255,255,0.28)"
        accentColor="#1F3FD9"
        opacity={0.7}
        zIndex={0}
      />
      <div className="relative z-10 mx-auto max-w-shell px-5 py-28 text-center md:px-10 md:py-40">
        <FadeUp>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mx-auto mt-7 max-w-[20ch] font-display text-[clamp(36px,5.6vw,80px)] font-light leading-[1.02] tracking-[-0.025em] text-paper">
            {heading.join(" ")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mx-auto mt-7 max-w-[540px] text-[16px] leading-relaxed text-paper/65">
            {body}
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href={ctaHref}
              className="inline-flex rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-charcoal"
            >
              {ctaLabel}
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
