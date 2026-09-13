"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CalendarBlank, Check, Clock, EnvelopeSimple,
  InstagramLogo, MapPin, MessengerLogo, Phone, UsersThree,
} from "@phosphor-icons/react";
import type { SharedContent } from "../sanity/content";
import type { InvitePageContent } from "../sanity/content-types";
import { ScrollRosettes } from "./FolkRosette";
import { SiteHeader } from "./SiteHeader";
import { PageHero } from "./PageHero";

const iconComponents = {
  calendar: CalendarBlank,
  check: Check,
  clock: Clock,
  location: MapPin,
  people: UsersThree,
} as const;

export function InvitePage({ content, shared }: { content: InvitePageContent; shared: SharedContent }) {
  const bookingHref = `mailto:${shared.siteConfig.contact.email}?subject=${encodeURIComponent(content.booking.subject)}&body=${encodeURIComponent(content.booking.body)}`;
  return (
    <main className="home-v2 invite-page">
      <a className="invite-skip-link" href="#invite-content">{content.skipLabel}</a>
      <ScrollRosettes />

      <SiteHeader activeHref="/zapros-halke" shared={shared} />




      <PageHero id="invite-content" titleId="invite-title"
        eyebrow={content.hero.eyebrow}
        title={<><span>{content.hero.title}</span><em>{content.hero.titleAccent}</em></>}
        lead={content.hero.lead}
        actions={
          <>
            <a href={bookingHref}>{content.hero.primaryCtaLabel} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
            <a href={"tel:" + shared.siteConfig.contact.phone}>
              <span className="page-hero-phone-icon" aria-hidden="true">
                <Phone  size={18} weight="regular" />
              </span>
              <span className="page-hero-phone-copy">
                <small>{content.hero.phoneLabel}</small>
                <strong>{shared.siteConfig.contact.phoneDisplay}</strong>
              </span>
            </a>
          </>
        }
        // extra={
        //   <a className="page-hero-phone" href={"tel:" + siteConfig.contact.phone}>
        //     <span className="page-hero-phone-icon" aria-hidden="true">
        //       <Phone size={18} weight="fill" />
        //     </span>
        //     <span className="page-hero-phone-copy">
        //       <small>Wolisz zadzwonić?</small>
        //       <strong>{siteConfig.contact.phoneDisplay}</strong>
        //     </span>
        //   </a>
        // }
        image={{ ...content.hero.image, width: content.hero.image.width || 2500, height: content.hero.image.height || 1667, position: "50% 42%" }}
        noteLabel={content.hero.noteLabel}
        note={
          <>
            <p>
              {content.hero.noteText}
            </p>

            <ul className="page-hero-facts">
              <li>
                <CalendarBlank size={24} weight="duotone" aria-hidden="true" />
                <span>
                  <b>{content.hero.fact1Title}</b>
                  <small>{content.hero.fact1Text}</small>
                </span>
              </li>

              <li>
                <MapPin size={24} weight="duotone" aria-hidden="true" />
                <span>
                  <b>{content.hero.fact2Title}</b>
                  <small>{content.hero.fact2Text}</small>
                </span>
              </li>

              <li>
                <Clock size={24} weight="duotone" aria-hidden="true" />
                <span>
                  <b>{content.hero.fact3Title}</b>
                  <small>{content.hero.fact3Text}</small>
                </span>
              </li>
            </ul>
          </>
        }
      />




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
          <h2 id="formats-title">{content.formats.title}<br /><em>{content.formats.titleAccent}</em></h2>
          <p>{content.formats.lead}</p>
        </div>
        <div className="invite-format-grid">
          {content.formats.items.map(({ title, text, image }, index) => (
            <article className="invite-format-card" key={title}>
              <figure>
                <img src={image.src} alt={image.alt} width={image.width || 1800} height={image.height || 1200} loading="lazy" decoding="async" />
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
          <h2 id="suites-title">{content.suites.title}<br /><em>{content.suites.titleAccent}</em></h2>
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
          <img src={content.process.image.src} alt={content.process.image.alt} width={content.process.image.width || 1800} height={content.process.image.height || 1198} loading="lazy" decoding="async" />
        </div>
        <div className="invite-process-copy">
          <p className="invite-kicker">{content.process.eyebrow}</p>
          <h2 id="process-title">{content.process.title}</h2>
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
            <h2 id="invite-contact-title">{content.contact.title}<br /><em>{content.contact.titleAccent}</em></h2>
            <p>{content.contact.lead}</p>
            <small>{content.contact.hint}</small>
          </div>
          <div className="invite-contact-panel">
            <a className="invite-contact-main" href={bookingHref}>
              <EnvelopeSimple size={24} weight="duotone" />
              <span><small>{content.contact.emailLabel}</small><strong>{shared.siteConfig.contact.email}</strong></span>
              <ArrowUpRight size={20} weight="bold" />
            </a>
            <a className="invite-contact-main" href={`tel:${shared.siteConfig.contact.phone}`}>
              <Phone size={24} weight="duotone" />
              <span><small>{content.contact.phoneLabel}</small><strong>{shared.siteConfig.contact.phoneDisplay}</strong></span>
              <ArrowUpRight size={20} weight="bold" />
            </a>
            <div className="invite-contact-socials">
              <span>{content.contact.socialPrompt}</span>
              <a href={shared.siteConfig.social.messenger} target="_blank" rel="noreferrer"><MessengerLogo size={20} weight="fill" /> {content.contact.messengerLabel}</a>
              <a href={shared.siteConfig.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={20} weight="bold" /> {content.contact.instagramLabel}</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-v2-footer invite-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt={shared.footer.logoAlt} width="58" height="58" /><span><strong>{shared.footer.brand}</strong><small>{shared.footer.tagline}</small></span></Link>
        <nav aria-label={shared.header.navigationLabel}>{shared.mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} {shared.footer.copyrightShort}</p>
      </footer>
    </main>
  );
}
