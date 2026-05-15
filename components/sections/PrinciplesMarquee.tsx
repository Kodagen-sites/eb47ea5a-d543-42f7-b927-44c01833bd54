import Marquee from "@/components/motion/Marquee";

/**
 * Section 9 — Operating principles marquee on a dark ground.
 * Tone: charcoal (dark).
 */
const PRINCIPLES = [
  "Diagnose before you prescribe",
  "Systems over heroics",
  "Documented, instrumented, owned",
  "Embed until it holds",
  "Forecasts you can defend",
  "Order that survives growth",
];

export default function PrinciplesMarquee() {
  return (
    <section className="overflow-hidden border-y border-paper/10 bg-charcoal py-10 md:py-14">
      <Marquee speed={42} gap="gap-6" pauseOnHover>
        {PRINCIPLES.map((p) => (
          <span key={p} className="flex items-center gap-6">
            <span className="font-display text-[clamp(22px,3vw,40px)] font-light tracking-[-0.01em] text-paper/85">
              {p}
            </span>
            <span aria-hidden className="text-2xl text-accent">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
