"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarBlank, Check, Clock, EnvelopeSimple,
  InstagramLogo, MapPin, MessengerLogo, Phone, UsersThree,
} from "@phosphor-icons/react";
import { mainNavigation, siteConfig } from "../content/site-config";
import type { InvitePageContent } from "../sanity/content-types";
import { ScrollRosettes } from "./HeroVariants";
import { SiteHeader } from "./SiteHeader";

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
  // { src: "/gallery/tydzien-kultury-beskidzkiej-2026/01.webp", alt: "Para taneczna Halki podczas suity śląskiej" },
  { src: "/gallery/dni-lublinca-2025/08.webp", alt: "Para taneczna Halki podczas suity śląskiej" },
  { src: "/gallery/tydzien-kultury-beskidzkiej-2026/10.webp", alt: "Męska część chóru Halki podczas występu" },
  { src: "/gallery/dni-lublinca-2025/14.webp", alt: "Wszystkie pokolenia Halki na jednej scenie" },
];

export function InvitePage({ content }: { content: InvitePageContent }) {
  return (
    <main className="home-v2 invite-page">
      <a className="invite-skip-link" href="#invite-content">Przejdź do treści</a>
      <ScrollRosettes />

      <SiteHeader activeHref="/zapros-halke" />



      <section className="invite-hero" id="invite-content" aria-labelledby="invite-title">
        <div className="invite-hero-copy">
          <p className="invite-kicker">{content.hero.eyebrow}</p>
          <h1 id="invite-title">
            Zaproś Halkę.
            <br />
            <em>Niech scena ożyje.</em>
          </h1>

          <span className="invite-hero-divider" aria-hidden="true">
            <i />
            <b />
            <i />
          </span>

          <p className="invite-hero-lead">
            {content.hero.lead}
          </p>

          <div className="invite-hero-actions">
            <a
              className="invite-button invite-button-primary"
              href={bookingHref}
            >
              Sprawdź dostępność
              <ArrowRight size={19} weight="bold" />
            </a>

            <a
              className="invite-button invite-button-ghost"
              href="#programy"
            >
              Poznaj możliwości
            </a>
          </div>

          <a
            className="invite-hero-phone"
            href={`tel:${siteConfig.contact.phone}`}
          >
            <Phone size={17} weight="fill" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <div
          className="invite-hero-visual"
          aria-label="Tancerze Zespołu Pieśni i Tańca Halka"
        >
          <figure className="invite-hero-media">
            <img
              src="/invite/invite-header-image2.webp"
              alt="Tancerze Zespołu Pieśni i Tańca Halka podczas wydarzenia plenerowego"
              width={2048}
              height={1363}
              sizes="(max-width: 700px) 100vw, 50vw"
              fetchPriority="high"
              decoding="async"
            />

            <figcaption className="invite-hero-visual-note">
              <small>Tydzień Kultury Beskidzkiej · Wisła</small>
              <strong>Pieśń · taniec · żywa tradycja</strong>
            </figcaption>
          </figure>
        </div>

        <div
          className="invite-hero-facts"
          aria-label="Najważniejsze informacje potrzebne do sprawdzenia terminu"
        >
          <p>
            Żeby sprawdzić termin,
            <br />
            wystarczą 3 informacje
          </p>

          <ul>
            <li>
              <CalendarBlank size={24} weight="duotone" aria-hidden="true" />
              <span>
                <strong>Termin</strong>
                <small>data wydarzenia</small>
              </span>
            </li>

            <li>
              <MapPin size={24} weight="duotone" aria-hidden="true" />
              <span>
                <strong>Miejsce</strong>
                <small>miasto i rodzaj sceny</small>
              </span>
            </li>

            <li>
              <Clock size={24} weight="duotone" aria-hidden="true" />
              <span>
                <strong>Format</strong>
                <small>planowany czas występu</small>
              </span>
            </li>
          </ul>
        </div>
      </section>




{/* 
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
      </section> */}
{/* 
      <section className="invite-intro invite-shell" aria-labelledby="invite-intro-title">
        <div>
          <p className="invite-kicker">Występ szyty na miarę wydarzenia</p>
          <h2 id="invite-intro-title">Od kameralnej sceny po <em>święto całego miasta.</em></h2>
        </div>
        <div className="invite-intro-copy">
          <p>Nie wysyłamy jednej, sztywnej oferty. Najpierw poznajemy miejsce, publiczność i rytm wydarzenia, a potem proponujemy skład i repertuar, które naprawdę do niego pasują.</p>
          <a href={bookingHref}>Opowiedz nam o wydarzeniu <ArrowUpRight size={18} weight="bold" /></a>
        </div>
      </section> */}

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
                <h3>{title}</h3>
                <span>0{index + 1}</span>
                <p>{text}</p>
              </div>
            </article>
          ))}
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
          <img src="/session/modal-cieszyn-male-02.webp" alt="Tancerze Halki ćwiczący w parach podczas warsztatów w Wiśle" width="1800" height="1198" loading="lazy" decoding="async" />
          <span>Za każdym występem stoi wspólna praca. Warsztaty w Wiśle.</span>
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
