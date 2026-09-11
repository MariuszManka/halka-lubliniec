"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNavigation } from "../content/site-config";

type SiteHeaderProps = {
  activeHref?: string;
  home?: boolean;
};

export function SiteBrand({ home = false }: { home?: boolean }) {
  return (
    <Link
      className="home-v2-brand"
      href={home ? "#poczatek" : "/"}
      aria-label={home ? "Halka — przejdź na początek strony" : "Halka — strona główna"}
    >
      <img src="/logo.jpg" alt="" width="46" height="46" />
      <span><strong>Halka</strong><small>Lubliniec</small></span>
    </Link>
  );
}

export function SiteHeader({ activeHref, home = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const generatedId = useId();
  const menuId = `site-mobile-menu-${generatedId.replace(/:/g, "")}`;
  const contactHref = home ? "#kontakt" : "/#kontakt";

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeOnDesktop = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeMenu = (event: Event) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("focusin", closeMenu);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("focusin", closeMenu);
    };
  }, [menuOpen]);

  return (
    <header className="home-v2-header" ref={headerRef}>
      <SiteBrand home={home} />
      <nav className="home-v2-nav" aria-label="Główna nawigacja">
        {mainNavigation.map((item) => (
          <Link
            aria-current={item.href === activeHref ? "page" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="home-v2-contact" href={contactHref}>Kontakt</Link>
      <button
        className="home-v2-menu-button"
        ref={menuButtonRef}
        type="button"
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="home-v2-menu-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="home-v2-mobile-nav"
            id={menuId}
            aria-label="Menu mobilne"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion
              ? { opacity: 0, transition: { duration: 0.12 } }
              : { opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: reduceMotion ? 0.12 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {mainNavigation.map((item) => (
              <Link
                aria-current={item.href === activeHref ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={contactHref} onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}