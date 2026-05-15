import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Next.js 16 auto-discovers app/icon.tsx and serves it as
// /icon — wired into the <head> with <link rel="icon">. No
// extra metadata config needed. Re-renders at request time so a
// brand colour change in site-config takes effect immediately.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const name = (siteConfig as any)?.brand?.name ?? (siteConfig as any)?.seo?.siteName ?? "K";
  const accent =
    (siteConfig as any)?.brand?.colors?.accent ??
    (siteConfig as any)?.brand?.colors?.primary ??
    "#0a0a0a";
  const initial = String(name).trim().charAt(0).toUpperCase() || "K";

  return new ImageResponse(
    (
      <div
        style={{
          background: accent,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: -0.5,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
