import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the SaharaOps website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        image="/section-services.jpg"
        intro="These terms govern your use of this website and the consultation booking it offers."
      />
      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[760px] space-y-8 px-5 text-[15px] leading-relaxed text-slate md:px-10">
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Use of this site</h2>
            <p>
              This website is provided for general information about SaharaOps
              and its services. By using it you agree to do so lawfully and not
              to misuse or attempt to disrupt the site or its booking tools.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">No engagement until agreed</h2>
            <p>
              Booking a consultation does not by itself create a consulting
              engagement. Any engagement begins only under a separate written
              agreement signed by both parties.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Intellectual property</h2>
            <p>
              All content, design, and copy on this site are the property of
              {" "}
              {siteConfig.company.legalName} unless otherwise noted, and may not
              be reproduced without permission.
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl text-charcoal">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
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
