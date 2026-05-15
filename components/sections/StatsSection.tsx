import { siteConfig } from "@/content/site-config";
import NumberCounter from "@/components/motion/NumberCounter";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";

/**
 * Section 7 — Stats. Three counters on a dark ground.
 * Tone: ink (dark).
 */
export default function StatsSection() {
  const { eyebrow, items } = siteConfig.stats;

  return (
    <section className="section-pad bg-ink text-paper">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <FadeUp>
          <p className="eyebrow text-accent">{eyebrow}</p>
        </FadeUp>
        <StaggerChildren
          staggerDelay={0.12}
          className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {items.map((stat) => (
            <div key={stat.label} className="border-t border-paper/15 pt-7">
              <div className="font-display text-[clamp(56px,8vw,108px)] font-light leading-none tracking-[-0.03em] text-paper">
                <NumberCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-5 max-w-[22ch] text-[15px] leading-relaxed text-paper/60">
                {stat.label}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
