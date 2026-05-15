import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper">
      <div className="mx-auto max-w-shell px-5 text-center md:px-10">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-[16ch] font-display text-[clamp(40px,6vw,84px)] font-light leading-[1.02] tracking-[-0.03em] text-charcoal">
          This page is off the map.
        </h1>
        <p className="mx-auto mt-6 max-w-[420px] text-[15px] leading-relaxed text-slate">
          The page you are looking for does not exist. Let&apos;s get you back
          to something useful.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-charcoal px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
