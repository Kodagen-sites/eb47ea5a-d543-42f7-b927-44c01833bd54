import { siteConfig } from "@/content/site-config";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";

/**
 * Section 8 — Testimonials. Stacked quote cards.
 * Tone: mist.
 */
export default function Testimonials() {
  const { eyebrow, heading, items } = siteConfig.testimonials;

  return (
    <section className="section-pad bg-mist">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(32px,4.4vw,58px)] font-light leading-[1.04] tracking-[-0.02em] text-charcoal">
            {heading}
          </h2>
        </FadeUp>

        <StaggerChildren
          staggerDelay={0.12}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {items.map((t) => (
            <figure
              key={t.author}
              className="flex h-full flex-col rounded-2xl border border-cloud bg-paper p-7 md:p-8"
            >
              <span aria-hidden className="font-display text-5xl leading-none text-accent/30">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-[16px] leading-relaxed text-charcoal">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-cloud pt-5">
                <span className="block font-display text-lg text-charcoal">
                  {t.author}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
