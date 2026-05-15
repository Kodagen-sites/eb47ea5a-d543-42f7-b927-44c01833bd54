"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site-config";

/**
 * ServiceCard — CV4-derived: clean architectural card with a parallax
 * thumbnail. The image drifts vertically as the card moves through the
 * viewport. Used across the homepage services grid and /services index.
 */
export default function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link
      ref={ref}
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cloud bg-paper transition-colors duration-300 hover:border-accent/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <motion.img
          src={service.imageUrl}
          alt={service.name}
          style={{ y }}
          className="absolute inset-0 h-[116%] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-paper">
          {service.index}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-2xl font-medium leading-snug text-charcoal">
          {service.name}
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">
          {service.summary}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Explore
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
