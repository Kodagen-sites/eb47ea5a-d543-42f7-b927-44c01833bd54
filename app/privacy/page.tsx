import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SaharaOps collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="/section-about.jpg"
        intro="Last updated on the date of publication. This policy explains how we handle the information you share with us."
      />
      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[760px] space-y-8 px-5 text-[15px] leading-relaxed text-slate md:px-10">
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Information we collect</h2>
            <p>
              SaharaOps collects only the information you choose to provide —
              typically your name, email address, company, and any details you
              include when you book a consultation or contact us. We do not sell
              or rent personal information to anyone.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">How we use it</h2>
            <p>
              We use your information to respond to enquiries, schedule and
              deliver consultations, and improve our services. Scheduling is
              handled through a third-party booking provider, which processes
              your details under its own privacy policy.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of the
              personal information we hold about you at any time. To do so,
              email{" "}
              <a className="text-accent underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a className="text-accent underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
