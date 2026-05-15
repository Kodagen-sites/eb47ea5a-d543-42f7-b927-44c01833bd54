import { siteConfig } from "@/content/site-config";
import ImageGallery from "@/components/ImageGallery";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Section 4 — Showcase. Image mosaic on a dark ground.
 * Tone: ink (dark contrast section).
 */
export default function Showcase() {
  const { eyebrow, heading, intro, images } = siteConfig.showcase;

  return (
    <section className="section-pad bg-ink text-paper">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-end">
          <div>
            <FadeUp>
              <p className="eyebrow text-accent">{eyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(32px,4.4vw,58px)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
                {heading}
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.16}>
            <p className="max-w-md text-[15px] leading-relaxed text-paper/60">
              {intro}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-12">
          <ImageGallery images={images} layout="feature-plus-grid" columns={3} />
        </FadeUp>
      </div>
    </section>
  );
}
