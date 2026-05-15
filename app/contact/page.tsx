import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import PageHero from "@/components/sections/PageHero";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import FadeUp from "@/components/motion/FadeUp";
import { Mail, Phone, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute consultation with SaharaOps. Remote, working with growth-stage teams worldwide.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
  { icon: Globe, label: "Where we work", value: siteConfig.contact.location, href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's look at where your operations are straining."
        image="/section-contact.jpg"
        intro="Book a 30-minute consultation. We will walk through the friction you are feeling and whether SaharaOps is the right fit to fix it."
      />

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-5 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-10">
          <div>
            <FadeUp>
              <p className="eyebrow text-accent">Direct lines</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-charcoal">
                Prefer to reach out first?
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate">
                SaharaOps is a remote practice. We work with teams across time
                zones — there is no office to visit, and no friction to start.
              </p>
            </FadeUp>

            <div className="mt-10 space-y-0">
              {DETAILS.map((d, i) => {
                const Icon = d.icon;
                const inner = (
                  <div className="flex items-start gap-4 border-t border-cloud py-6">
                    <Icon size={20} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                        {d.label}
                      </span>
                      <span className="mt-1 block text-lg text-charcoal">
                        {d.value}
                      </span>
                    </div>
                  </div>
                );
                return (
                  <FadeUp key={d.label} delay={i * 0.07}>
                    {d.href ? (
                      <a href={d.href} className="block transition-colors hover:text-accent">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </FadeUp>
                );
              })}
            </div>
          </div>

          <div>
            <FadeUp>
              <p className="eyebrow text-accent">Book directly</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mb-7 mt-5 font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] tracking-[-0.02em] text-charcoal">
                Pick a time that works.
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <CalendlyEmbed url={siteConfig.contact.calendlyUrl} />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
