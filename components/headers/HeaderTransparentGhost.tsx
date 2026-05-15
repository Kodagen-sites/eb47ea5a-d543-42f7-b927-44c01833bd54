"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/content/site-config";
import { NAV_LINKS } from "./nav-links";
import { useScrollState } from "./hooks";

/**
 * Header — TRANSPARENT GHOST (light theme, S11 Architectural Product).
 * Floats over the cinematic hero, gains a white blur backdrop on scroll.
 */
export default function HeaderTransparentGhost() {
  const scrolled = useScrollState(60);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid
            ? "border-b border-cloud bg-paper/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="font-display text-lg font-medium tracking-[-0.01em] text-charcoal"
          >
            {siteConfig.company.name}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.2em] text-slate md:flex">
            {NAV_LINKS.slice(1).map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-charcoal ${
                    active ? "text-accent" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-full bg-charcoal px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent md:inline-flex"
            >
              Book a Consultation
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-charcoal md:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileOverlay onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-paper md:hidden"
    >
      <div className="flex items-center justify-between px-5 py-5">
        <span className="font-display text-lg font-medium text-charcoal">
          {siteConfig.company.name}
          <span className="text-accent">.</span>
        </span>
        <button onClick={onClose} className="text-charcoal" aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <ul className="flex flex-col gap-7 px-6 pt-10">
        {NAV_LINKS.map((link, i) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display text-4xl text-charcoal transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex rounded-full bg-charcoal px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper"
          >
            Book a Consultation
          </Link>
        </motion.li>
      </ul>
    </motion.div>
  );
}
