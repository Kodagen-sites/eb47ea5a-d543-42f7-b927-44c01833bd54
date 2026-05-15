import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SocialLinks } from "@/components/social-icons";

/**
 * Footer — FT6 Multi-Block Institutional. Dark closing band.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-shell px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-medium tracking-[-0.01em]"
            >
              {siteConfig.company.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/55">
              {siteConfig.footer.brandStatement}
            </p>
            <div className="mt-7">
              <SocialLinks socials={siteConfig.socials} />
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="transition-colors hover:text-accent">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-paper/55">{siteConfig.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {siteConfig.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
