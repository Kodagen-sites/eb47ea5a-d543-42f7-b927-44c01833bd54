import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import PageHero from "@/components/sections/PageHero";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";
import { Check, ArrowRight } from "lucide-react";

type Params = { slug: string };

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = siteConfig.services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={service.name}
        image={service.imageUrl}
        intro={service.summary}
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-5 md:grid-cols-[1.3fr_1fr] md:px-10">
          <FadeUp>
            <div className="space-y-6 text-lg leading-relaxed text-slate">
              <p className="text-charcoal">{service.description}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-cloud bg-mist p-7 md:p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                What you receive
              </h2>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] text-charcoal">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-mist">
        <div className="mx-auto max-w-shell px-5 md:px-10">
          <FadeUp>
            <p className="eyebrow text-accent">Continue exploring</p>
          </FadeUp>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group rounded-2xl border border-cloud bg-paper p-7 transition-colors hover:border-accent/40"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                  {o.index}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium text-charcoal">
                  {o.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {o.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  View <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink text-paper">
        <div className="mx-auto max-w-shell px-5 text-center md:px-10">
          <FadeUp>
            <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(30px,4.4vw,56px)] font-light leading-[1.06] tracking-[-0.02em]">
              Bring {service.name.toLowerCase()} into your company.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="mt-9">
              <MagneticButton
                as="a"
                href="/contact"
                className="inline-flex rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-charcoal"
              >
                Book a Consultation
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
