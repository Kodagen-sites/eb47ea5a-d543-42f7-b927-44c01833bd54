"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollCanvas from "@/components/ScrollCanvas";
import HeroScrollText, { type HeroChapter } from "@/components/motion/HeroScrollText";
import ScrollHint from "@/components/motion/ScrollHint";

const CHAPTERS: HeroChapter[] = [
  {
    at: 0,
    eyebrow: "Operational Readiness Consulting",
    headlineLines: ["Operational readiness", "for Startups,", "SMEs & NGOs."],
    subline:
      "We build the systems, processes, and strategies that help organizations scale efficiently, cut costs, and achieve sustainable growth.",
  },
  {
    at: 0.42,
    eyebrow: "Why SaharaOps?",
    headlineLines: ["Growth requires", "structure."],
    subline:
      "Without the right processes, strategy and execution fall out of sync — leading to inefficiencies and missed opportunities. We close that gap.",
  },
  {
    at: 0.78,
    eyebrow: "Proven outcomes",
    headlineLines: ["Build your operational", "backbone."],
    subline: "Resilience, efficiency, and sustainable growth across industries.",
    cta: { label: "Book a Consultation", href: "/contact" },
  },
];

export default function HomeHero({
  frameCount,
  frameDir = "/frames",
  fallbackImage,
}: {
  frameCount: number;
  frameDir?: string;
  fallbackImage: string;
}) {
  const [progress, setProgress] = useState(0);
  const hasFrames = frameCount >= 24;

  if (hasFrames) {
    return (
      <ScrollCanvas
        frameCount={frameCount}
        pattern={`${frameDir}/frame-{n}.jpg`}
        padLength={4}
        scrollDistance={3.6}
        onProgress={setProgress}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper/40" />
        <HeroScrollText
          progress={progress}
          chapters={CHAPTERS}
          position="center"
          textColor="#14181F"
          accentColor="#1F3FD9"
          accentTextColor="#FFFFFF"
        />
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <ScrollHint label="Scroll" accentColor="#1F3FD9" />
        </div>
      </ScrollCanvas>
    );
  }

  return <StaticHero image={fallbackImage} />;
}

function StaticHero({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const c = CHAPTERS[0];

  return (
    <section ref={ref} className="relative flex h-[100svh] items-center overflow-hidden bg-mist">
      <motion.img
        src={image}
        alt=""
        aria-hidden
        style={{ y }}
        className="absolute inset-0 h-[122%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/25 to-paper/65" />
      <div className="relative mx-auto w-full max-w-shell px-5 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-accent">{c.eyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-[16ch] font-display text-[clamp(44px,8vw,104px)] font-light leading-[0.98] tracking-[-0.03em] text-charcoal">
            {c.headlineLines.join(" ")}
          </h1>
          <p className="mx-auto mt-7 max-w-[560px] text-lg leading-relaxed text-slate">
            {c.subline}
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex rounded-full bg-charcoal px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <ScrollHint label="Scroll" accentColor="#1F3FD9" />
      </div>
    </section>
  );
}
