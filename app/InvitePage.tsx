"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarBlank, Check, Clock, EnvelopeSimple,
  InstagramLogo, List, MapPin, MessengerLogo, Phone, UsersThree, X,
} from "@phosphor-icons/react";
import { mainNavigation, siteConfig } from "../content/site-config";
import type { InvitePageContent } from "../sanity/content-types";
import { ScrollRosettes } from "./HeroVariants";

const bookingSubject = "Zapytanie o występ ZPiT Halka";
const bookingBody = `Dzień dobry,

chcę zaprosić ZPiT Halka na wydarzenie.

Termin:
Miejsce:
Rodzaj wydarzenia:
Przewidywana długość występu:

Proszę o informację o dostępności i możliwym programie.`;
const bookingHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(bookingSubject)}&body=${encodeURIComponent(bookingBody)}`;

const iconComponents = {
  calendar: CalendarBlank,
  check: Check,
  clock: Clock,
  location: MapPin,
  people: UsersThree,
} as const;

const formatImages = [
  { src: "/gallery/tydzien-kultury-beskidzkiej-2026/01.webp", alt: "Para taneczna Halki podczas suity śląskiej" },
  { src: "/gallery/tydzien-kultury-beskidzkiej-2026/10.webp", alt: "Męska część chóru Halki podczas występu" },
  { src: "/gallery/dni-lublinca-2025/14.webp", alt: "Wszystkie pokolenia Halki na jednej scenie" },
];

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
        <a className="home-v2-contact" href={bookingHref}>Sprawdź termin</a>
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
            <a href={bookingHref} onClick={() => setMenuOpen(false)}>Sprawdź termin</a>
          </nav>
        )}
      </header>

      <section className="invite-hero" id="invite-content" aria-labelledby="invite-title">
        <div className="invite-hero-media" aria-hidden="true">
          <img src="/gallery/tydzien-kultury-beskidzkiej-2026/08.webp" alt="" width="1800" height="1200" fetchPriority="high" />
        </div>
        <div className="invite-hero-shade" aria-hidden="true" />
        <div className="invite-hero-inner invite-shell">
          <div className="invite-hero-copy">
            <p className="invite-kicker">{content.hero.eyebrow} · ZPiT Halka Lubliniec</p>
            <h1 id="invite-title">Zaproś Halkę.<br /><em>Niech scena ożyje.</em></h1>
            <p className="invite-hero-lead">{content.hero.lead}</p>
            <div className="invite-hero-actions">
              <a className="invite-button invite-button-primary" href={bookingHref}>Sprawdź dostępność <ArrowRight size={19} weight="bold" /></a>
              <a className="invite-button invite-button-ghost" href="#programy">Poznaj możliwości</a>
            </div>
          </div>

          <aside className="invite-hero-card" aria-label="Jak zacząć rozmowę o występie">
            <p>Żeby sprawdzić termin, wystarczą 3 informacje</p>
            <ol>
              <li><CalendarBlank size={20} aria-hidden="true" /><span><strong>Termin</strong><small>data wydarzenia</small></span></li>
              <li><MapPin size={20} aria-hidden="true" /><span><strong>Miejsce</strong><small>miasto i rodzaj sceny</small></span></li>
              <li><Clock size={20} aria-hidden="true" /><span><strong>Format</strong><small>planowany czas występu</small></span></li>
            </ol>
            <a href={`tel:${siteConfig.contact.phone}`}><Phone size={18} weight="fill" /> {siteConfig.contact.phoneDisplay}</a>
          </aside>
        </div>
        <div className="invite-hero-caption invite-shell">
          <span>Tydzień Kultury Beskidzkiej · Wisła</span>
          <span>Pieśń · taniec · żywa tradycja</span>
        </div>
      </section>

      <section className="invite-intro invite-shell" aria-labelledby="invite-intro-title">
        <div>
          <p className="invite-kicker">Występ szyty na miarę wydarzenia</p>
          <h2 id="invite-intro-title">Od kameralnej sceny po <em>święto całego miasta.</em></h2>
        </div>
        <div className="invite-intro-copy">
          <p>Nie wysyłamy jednej, sztywnej oferty. Najpierw poznajemy miejsce, publiczność i rytm wydarzenia, a potem proponujemy skład i repertuar, które naprawdę do niego pasują.</p>
          <a href={bookingHref}>Opowiedz nam o wydarzeniu <ArrowUpRight size={18} weight="bold" /></a>
        </div>
      </section>

      <section className="invite-formats invite-shell" id="programy" aria-labelledby="formats-title">
        <div className="invite-section-head">
          <p className="invite-kicker">{content.formats.eyebrow}</p>
          <h2 id="formats-title">Trzy sposoby,<br /><em>żeby spotkać Halkę.</em></h2>
          <p>{content.formats.lead}</p>
        </div>
        <div className="invite-format-grid">
          {content.formats.items.map(({ title, text }, index) => (
            <article className="invite-format-card" key={title}>
              <figure>
                <img src={formatImages[index].src} alt={formatImages[index].alt} width="1800" height="1200" loading="lazy" decoding="async" />
              </figure>
              <div>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-availability" aria-labelledby="availability-title">
        <div className="invite-availability-inner invite-shell">
          <div>
            <p className="invite-kicker">Masz już datę?</p>
            <h2 id="availability-title">Zacznijmy od terminu.</h2>
            <p>W odpowiedzi podpowiemy, jaki skład i program możemy zaproponować.</p>
          </div>
          <a className="invite-button invite-button-paper" href={bookingHref}>Napisz do nas <ArrowRight size={19} weight="bold" /></a>
        </div>
      </section>

      <section className="invite-suites invite-shell" aria-labelledby="suites-title">
        <div className="invite-section-head invite-section-head-wide">
          <p className="invite-kicker">{content.suites.eyebrow}</p>
          <h2 id="suites-title">Trzy regiony.<br /><em>Trzy sceniczne temperamenty.</em></h2>
          <p>{content.suites.lead}</p>
        </div>
        <div className="invite-suite-list">
          {content.suites.items.map((suite, index) => (
            <article className="invite-suite" id={suite.id} key={suite.id}>
              <figure>
                <img src={suite.image.src} alt={suite.image.alt} width={suite.image.width || 1800} height={suite.image.height || 1200} loading="lazy" decoding="async" />
              </figure>
              <div className="invite-suite-copy">
                <span>{suite.label}</span>
                <strong>0{index + 1}</strong>
                <h3>{suite.name}</h3>
                <p>{suite.description}</p>
                <Link href="/kostiumy">{content.suites.costumesCtaLabel} <ArrowUpRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-process invite-shell" aria-labelledby="process-title">
        <div className="invite-process-image">
          <img src="/gallery/polonez-na-lublinieckim-rynku/06.webp" alt="Halka prowadzi poloneza na rynku w Lublińcu" width="1800" height="1200" loading="lazy" decoding="async" />
          <span>Występujemy na scenach, rynkach i podczas wydarzeń plenerowych.</span>
        </div>
        <div className="invite-process-copy">
          <p className="invite-kicker">Od wiadomości do występu</p>
          <h2 id="process-title">Prosto i bez niedomówień.</h2>
          <ol>
            {content.process.items.map(({ icon, title, text }, index) => {
              const Icon = iconComponents[icon];
              return (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <Icon size={22} aria-hidden="true" />
                  <div><strong>{title}</strong><p>{text}</p></div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="invite-proof invite-shell" aria-labelledby="proof-title">
        <div className="invite-proof-copy">
          <p className="invite-kicker">Scena Pokoleń</p>
          <h2 id="proof-title">Jedna Halka.<br /><em>Wiele pokoleń.</em></h2>
          <p>Chór, balet i grupy dziecięce mogą spotkać się w jednym wspólnym programie — jeśli termin i scena pozwalają zebrać pełny skład.</p>
          <Link href="/galeria">Zobacz nas na żywo <ArrowRight size={18} weight="bold" /></Link>
        </div>
        <figure>
          <img src="/gallery/dni-lublinca-2025/14.webp" alt="Pełny, międzypokoleniowy skład Halki na scenie podczas Dni Lublińca" width="1800" height="1200" loading="lazy" decoding="async" />
          <figcaption>Dni Lublińca · wspólny występ wszystkich grup</figcaption>
        </figure>
      </section>

      <section className="invite-contact" aria-labelledby="invite-contact-title">
        <div className="invite-contact-inner invite-shell">
          <div className="invite-contact-copy">
            <p className="invite-kicker">{content.contact.eyebrow}</p>
            <h2 id="invite-contact-title">Zróbmy razem<br /><em>dobry występ.</em></h2>
            <p>{content.contact.lead}</p>
            <small>{content.contact.hint}</small>
          </div>
          <div className="invite-contact-panel">
            <a className="invite-contact-main" href={bookingHref}>
              <EnvelopeSimple size={24} weight="duotone" />
              <span><small>Napisz e-mail</small><strong>{siteConfig.contact.email}</strong></span>
              <ArrowUpRight size={20} weight="bold" />
            </a>
            <a className="invite-contact-main" href={`tel:${siteConfig.contact.phone}`}>
              <Phone size={24} weight="duotone" />
              <span><small>Zadzwoń</small><strong>{siteConfig.contact.phoneDisplay}</strong></span>
              <ArrowUpRight size={20} weight="bold" />
            </a>
            <div className="invite-contact-socials">
              <span>{content.contact.socialPrompt}</span>
              <a href={siteConfig.social.messenger} target="_blank" rel="noreferrer"><MessengerLogo size={20} weight="fill" /> Messenger</a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={20} weight="bold" /> Instagram</a>
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
