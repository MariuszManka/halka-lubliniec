"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Check,
  Clock,
  EnvelopeSimple,
  InstagramLogo,
  List,
  MapPin,
  MessengerLogo,
  Phone,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { mainNavigation, siteConfig } from "../content/site-config";
import type { InvitePageContent } from "../sanity/content-types";
import { ScrollRosettes } from "./HeroVariants";

const contactSubject = "Zapytanie%20o%20dost%C4%99pno%C5%9B%C4%87%20zespo%C5%82u";

const iconComponents = {
  calendar: CalendarBlank,
  check: Check,
  clock: Clock,
  location: MapPin,
  people: UsersThree,
} as const;

export function InvitePage({ content }: { content: InvitePageContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <main className="home-v2 invite-page">
      <a className="invite-skip-link" href="#invite-content">Przejdź do treści</a>
      <ScrollRosettes />

      <header className="home-v2-header" ref={headerRef}>
        <Link className="home-v2-brand" href="/" aria-label="Halka, strona główna">
          <img src="/logo.jpg" alt="" width="46" height="46" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </Link>
        <nav className="home-v2-nav" aria-label="Główna nawigacja">
          {mainNavigation.map((item) => (
            <Link aria-current={item.href === "/zapros-halke" ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link className="home-v2-contact" href="/#kontakt">Kontakt</Link>
        <button
          className="home-v2-menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="invite-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        {menuOpen && (
          <nav className="home-v2-mobile-nav" id="invite-mobile-menu" aria-label="Menu mobilne">
            {mainNavigation.map((item) => (
              <Link aria-current={item.href === "/zapros-halke" ? "page" : undefined} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </nav>
        )}
      </header>

      <section className="invite-hero invite-shell" id="invite-content" aria-labelledby="invite-title">
        <div className="invite-hero-copy">
          <p className="invite-eyebrow"><span>{content.hero.eyebrow}</span><i aria-hidden="true" /></p>
          <h1 id="invite-title">{content.hero.title} <em>{content.hero.titleAccent}</em><br />{content.hero.titleSuffix}</h1>
          <p className="invite-hero-lead">{content.hero.lead}</p>
          <div className="invite-hero-actions">
            <a className="invite-button invite-button-primary" href={`mailto:${siteConfig.contact.email}?subject=${contactSubject}`}>{content.hero.primaryCtaLabel} <ArrowRight size={18} weight="bold" /></a>
            <a className="invite-button invite-button-light" href="#programy">{content.hero.secondaryCtaLabel}</a>
          </div>
        </div>

        <div className="invite-hero-visual">
          <figure className="invite-hero-photo">
            <img
              src={content.hero.image.src}
              alt={content.hero.image.alt}
              width={content.hero.image.width || 1800}
              height={content.hero.image.height || 1200}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <div className="invite-hero-note">
            <span>{content.hero.noteLabel}</span>
            <strong>{content.hero.noteText}</strong>
          </div>
          <span className="invite-hero-ornament" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </section>

      <section className="invite-formats invite-shell" aria-labelledby="formats-title">
        <div className="invite-format-intro">
          <span className="invite-format-kicker">{content.formats.eyebrow}</span>
          <h2 id="formats-title"><span>{content.formats.title}</span><em>{content.formats.titleAccent}</em></h2>
          <p>{content.formats.lead}</p>
        </div>

        <ol className="invite-format-layout">
          {content.formats.items.map(({ icon, title, text }, index) => {
            const Icon = iconComponents[icon];
            return (
            <li className={`invite-format-card invite-format-card-${index + 1}`} key={title}>
              <div className="invite-format-marker" aria-hidden="true">
                <span>0{index + 1}</span>
                <Icon size={30} weight="duotone" />
              </div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
            );
          })}
        </ol>
      </section>

      <section className="invite-suites invite-shell" id="programy" aria-labelledby="suites-title">
        <div className="invite-section-heading invite-section-heading-suites">
          <p>{content.suites.eyebrow}</p>
          <h2 id="suites-title">{content.suites.title}<br /><em>{content.suites.titleAccent}</em></h2>
          <p className="invite-section-lead">{content.suites.lead}</p>
        </div>

        <div className="invite-suite-grid">
          {content.suites.items.map((suite, index) => (
            <article className={`invite-suite invite-suite-${index + 1}`} id={suite.id} key={suite.id}>
              <figure>
                <img src={suite.image.src} alt={suite.image.alt} width={suite.image.width || 1800} height={suite.image.height || 1200} loading={index ? "lazy" : "eager"} decoding="async" />
              </figure>
              <div className="invite-suite-copy">
                <span>{suite.label}</span>
                <h3>{suite.name}</h3>
                <p>{suite.description}</p>
                <a href="/kostiumy">{content.suites.costumesCtaLabel} <ArrowUpRight size={18} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-process invite-shell" aria-labelledby="process-title">
        <div className="invite-process-photo">
          <img src={content.process.image.src} srcSet={content.process.image.src === "/session/dance-circle.webp" ? "/home-responsive/dance-circle-960.webp 960w, /home-responsive/dance-circle-1600.webp 1600w" : undefined} sizes="(max-width: 940px) calc(100vw - 32px), 46vw" alt={content.process.image.alt} width={content.process.image.width || 2200} height={content.process.image.height || 1467} loading="lazy" decoding="async" />
        </div>
        <div className="invite-process-copy">
          <p className="invite-section-label">{content.process.eyebrow}</p>
          <h2 id="process-title">{content.process.title}</h2>
          <div className="invite-process-list">
            {content.process.items.map(({ icon, title, text }) => {
              const Icon = iconComponents[icon];
              return <div key={title}><Icon size={23} /><span><strong>{title}</strong><small>{text}</small></span></div>;
            })}
          </div>
        </div>
      </section>

      <section className="invite-stage invite-shell" aria-labelledby="stage-title">
        <div className="invite-stage-heading">
          <p>{content.stage.eyebrow}</p>
          <h2 id="stage-title">{content.stage.title} <em>{content.stage.titleAccent}</em></h2>
          <span>{content.stage.lead}</span>
        </div>
        <figure className="invite-stage-window">
          <img src={content.stage.image.src} alt={content.stage.image.alt} width={content.stage.image.width || 1800} height={content.stage.image.height || 1200} loading="lazy" decoding="async" />
          <figcaption>
            <span><strong>{content.stage.eventTitle}</strong><small>{content.stage.eventText}</small></span>
            <Link href="/galeria">{content.stage.ctaLabel} <ArrowRight size={18} weight="bold" /></Link>
          </figcaption>
        </figure>
      </section>

      <section className="invite-contact" aria-labelledby="invite-contact-title">
        <span className="invite-contact-ornament invite-contact-ornament-left" aria-hidden="true">
          <span className="folk-rosette invite-contact-rosette"><i /><i /><i /><i /><i /><i /><i /><i /><b /></span>
          <i /><i /><i />
        </span>
        <span className="invite-contact-ornament invite-contact-ornament-right" aria-hidden="true">
          <span className="folk-rosette invite-contact-rosette"><i /><i /><i /><i /><i /><i /><i /><i /><b /></span>
          <i /><i /><i />
        </span>
        <div className="invite-contact-inner invite-shell">
          <div className="invite-contact-copy">
            <p>{content.contact.eyebrow}</p>
            <h2 id="invite-contact-title">{content.contact.title}</h2>
            <span>{content.contact.lead}</span>
            <small>{content.contact.hint}</small>
          </div>
          <div className="invite-contact-panel">
            <div className="invite-contact-direct">
              <a href={`mailto:${siteConfig.contact.email}?subject=${contactSubject}`}>
                <span className="invite-contact-channel-icon"><EnvelopeSimple size={22} weight="duotone" /></span>
                <span><small>E-mail</small><strong>{siteConfig.contact.email}</strong></span>
                <span className="invite-contact-arrow"><ArrowUpRight size={18} weight="bold" /></span>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`}>
                <span className="invite-contact-channel-icon"><Phone size={22} weight="duotone" /></span>
                <span><small>Telefon</small><strong>{siteConfig.contact.phoneDisplay}</strong></span>
                <span className="invite-contact-arrow"><ArrowUpRight size={18} weight="bold" /></span>
              </a>
            </div>
            <div className="invite-contact-socials">
              <p>{content.contact.socialPrompt}</p>
              <div>
                <a href={siteConfig.social.messenger} target="_blank" rel="noreferrer"><MessengerLogo size={21} weight="fill" /><span>Messenger</span><ArrowUpRight size={16} /></a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={21} weight="bold" /><span>Instagram</span><ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-v2-footer invite-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="58" height="58" /><span><strong>HALKA</strong><small>Od 1948 roku tańczymy razem.</small></span></Link>
        <nav aria-label="Nawigacja w stopce">{mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} ZPiT Halka</p>
      </footer>
    </main>
  );
}
