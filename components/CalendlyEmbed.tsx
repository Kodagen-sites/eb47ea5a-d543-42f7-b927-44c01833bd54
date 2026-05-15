"use client";

import { useEffect } from "react";

/**
 * CalendlyEmbed — inline scheduler widget. The "Book a Consultation"
 * action across the site resolves to this embed on the contact page.
 * Replace `url` in site-config (contact.calendlyUrl) with the real
 * Calendly or Cal.com link.
 */
export default function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-cloud bg-paper">
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "680px" }}
      />
      <noscript>
        <div className="p-8 text-center text-sm text-slate">
          Enable JavaScript to load the scheduler, or email{" "}
          <a className="text-accent underline" href="mailto:hello@saharaops.com">
            hello@saharaops.com
          </a>{" "}
          to book directly.
        </div>
      </noscript>
    </div>
  );
}
