"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  EnvelopeSimple,
  MapPin,
  MessengerLogo,
  Phone,
} from "@phosphor-icons/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import type { GalleryEvent } from "../sanity/content-types";
import type { EventsPageCmsContent, SharedContent } from "../sanity/content";
import type { CopyMap } from "../content/page-copy-defaults";
import { DanceHero } from "./HeroVariants";
import { ScrollRosettes } from "./FolkRosette";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

const formatGalleryDate = (date: string) => new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(`${date}T12:00:00`));

const galleryImagePicks: Record<string, readonly [number, number, number]> = {
  "warsztaty-w-wisle": [23, 3, 4],
  "dzien-slaski-w-chorzowie": [0, 11, 6],
  "dni-lublinca-2025": [5, 7, 3],
  "tydzien-kultury-beskidzkiej-2026": [6, 7, 8],
};

type ContactActionProps = {
  href: string;
  actionLabel: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
};

function ContactAction({ href, actionLabel, icon, label, value, external = false }: ContactActionProps) {
  return (
    <div className="home-v2-contact-action">
      <div className="home-v2-contact-content">
        {icon}
        <span className="home-v2-contact-details"><small>{label}</small><strong>{value}</strong></span>
      </div>
      <span className="home-v2-contact-link-cue">
        <span>{actionLabel}</span>
        <a
          className="home-v2-contact-open"
          href={href}
          draggable={false}
          aria-label={`${actionLabel}: ${value}`}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <ArrowUpRight size={15} weight="bold" />
        </a>
      </span>
    </div>
  );
}

export function HalkaHome({ galleryEvents, copy, shared, eventsContent }: { galleryEvents: GalleryEvent[]; copy: CopyMap; shared: SharedContent; eventsContent: EventsPageCmsContent }) {
  const UPCOMING_PERFORMANCES_AMOUNT = 3;
  const monthShort = copy["events.monthShort"].split("|");
  
  const [activeGallery, setActiveGallery] = useState(0);
  const galleryRailRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const upcomingPerformances = eventsContent.calendarEvents
    .filter((event) => event.kind === "Występ" && (event.endDate ?? event.date) >= today)
    .slice(0, UPCOMING_PERFORMANCES_AMOUNT);
  const featuredGallery = [...galleryEvents]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date))
    .slice(0, 4);

  const moveGallery = (direction: -1 | 1) => {
    if (!featuredGallery.length) return;
    const nextIndex = (activeGallery + direction + featuredGallery.length) % featuredGallery.length;
    const nextSlide = galleryRailRef.current?.querySelector<HTMLElement>(`[data-gallery-index="${nextIndex}"]`);
    setActiveGallery(nextIndex);
    nextSlide?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <main className="home-v2">
      <a className="home-v2-skip-link" href="#dolacz">{copy["skipLabel"]}</a>
      <ScrollRosettes />

      <SiteHeader home shared={shared} />

      <DanceHero copy={copy} />

      <section className="home-v2-join home-v2-shell" id="dolacz" aria-labelledby="dolacz-title">
        <div className="home-v2-join-layout">
          <p className="home-v2-section-note">{copy["join.eyebrow"]}</p>
          <h2 className="dolacz-title" id="dolacz-title">
            <span>{copy["join.title"]}</span>
            <em>{copy["join.titleAccent"]}</em>
          </h2>
          <aside className="home-v2-join-signal" aria-label={copy["join.signalLabel"]}>
            <span className="home-v2-join-count" aria-hidden="true">04</span>
            <p><strong>{copy["join.groupWord"]}</strong><span>{copy["join.teamWord"]}</span></p>
            <div className="home-v2-join-facts">
              <span>{copy["join.fact1"]}</span>
              <span>{copy["join.fact2"]}</span>
              <span>{copy["join.fact3"]}</span>
            </div>
          </aside>

          <div className="home-v2-group-list home-v2-group-list-compact">
            {shared.ensembleGroups.map((group, index) => (
              <a className="home-v2-group-row" href={`/dolacz#${group.id}`} key={group.id}>
                <div className="home-v2-group-copy">
                  <div className="home-v2-group-meta">
                    <span className="home-v2-group-index">0{index + 1}</span>
                    <span>{group.age}</span>
                  </div>
                  <div className="home-v2-group-name"><h3>{group.name}</h3></div>
                  <p>{group.activity}</p>
                  <span className="home-v2-group-action">{copy["join.groupCta"]} <ArrowRight size={19} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-v2-events home-v2-shell" id="wydarzenia" aria-labelledby="wydarzenia-title">
        <div className="home-v2-section-heading home-v2-section-heading-compact">
          <div>
            <p className="home-v2-section-note">{copy["events.eyebrow"]}</p>
            <h2 id="wydarzenia-title">{copy["events.title"]}</h2>
          </div>
          <a className="home-v2-text-link" href="/wydarzenia">{copy["events.cta"]} <ArrowRight size={18} /></a>
        </div>

        <div className="home-v2-event-list">
          {upcomingPerformances.length ? upcomingPerformances.map((event) => {
            const date = new Date(`${event.date}T12:00:00`);
            return (
              <a className="home-v2-event-row" href="/wydarzenia" key={event.id}>
                <time dateTime={event.date}><strong>{String(date.getDate()).padStart(2, "0")}</strong><span>{monthShort[date.getMonth()]} {date.getFullYear()}</span></time>
                <div><span>{event.kind}</span><h3>{event.title}</h3></div>
                <p><MapPin size={18} /> {event.location}</p>
                <div className="home-v2-event-groups">
                  {event.groups.map((group) => <span key={group}>{eventsContent.eventGroups[group].label}</span>)}
                </div>
                <ArrowUpRight className="home-v2-event-arrow" size={21} />
              </a>
            );
          }) : (
            <div className="home-v2-events-empty"><CalendarBlank size={26} /><p>{copy["events.empty"]}</p></div>
          )}
        </div>
      </section>

            <section className="home-v2-offer" id="zapros" aria-labelledby="zapros-title">
        <div className="home-v2-offer-shell home-v2-shell">
          <div className="home-v2-offer-copy">
            <p className="home-v2-section-note">{copy["offer.eyebrow"]}</p>
            <h2 id="zapros-title">{copy["offer.title"]}</h2>
            <p className="home-v2-offer-lead">{copy["offer.lead"]}</p>

            <div className="home-v2-offer-actions">
              <a className="home-v2-button home-v2-button-primary" href="/zapros-halke">{copy["offer.primaryCta"]} <ArrowRight size={19} /></a>
              <a className="home-v2-offer-mail" href={`mailto:${shared.siteConfig.contact.email}?subject=${encodeURIComponent(copy["offer.emailSubject"])}`}>{copy["offer.secondaryCta"]}</a>
            </div>
          </div>

          <div className="home-v2-offer-showcase">
            <figure className="home-v2-offer-image">
              {/* <img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 48vw" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka na scenie" loading="lazy" decoding="async" /> */}
              <img src="gallery\dni-lublinca-2025\14.webp" srcSet="/home-responsive/group-alt.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 48vw" alt={copy["offer.imageAlt"]} loading="lazy" decoding="async" />
            </figure>

          </div>
        </div>
      </section>

      <section className="home-v2-gallery-panel" aria-labelledby="galeria-title">
        <div className='home-v2-gallery-panel-outer-wrapper'>
          <div className="home-v2-gallery-showcase-heading">
            <div>
              <p className="home-v2-section-note">{copy["gallery.eyebrow"]}</p>
              <h2 id="galeria-title">{copy["gallery.title"]}<br />{copy["gallery.titleAccent"]}</h2>
            </div>
            <p style={{ borderRight: "4px solid var(--v2-red)", paddingRight: "12px", textAlign: "right", alignSelf: "center" }}>
              {copy["gallery.lead"]}
            </p>
          </div>

          <div
            className="home-v2-gallery-rail"
            aria-label={copy["gallery.railLabel"]}
            ref={galleryRailRef}
            tabIndex={0}
            onScroll={(event) => {
              const rail = event.currentTarget;
              const slides = Array.from(rail.querySelectorAll<HTMLElement>("[data-gallery-index]"));
              const railLeft = rail.getBoundingClientRect().left;
              const nearest = slides.reduce((best, slide, index) => (
                Math.abs(slide.getBoundingClientRect().left - railLeft) < best.distance
                ? { index, distance: Math.abs(slide.getBoundingClientRect().left - railLeft) }
                : best
              ), { index: 0, distance: Number.POSITIVE_INFINITY });
              if (nearest.index !== activeGallery) setActiveGallery(nearest.index);
            }}
          >
            {featuredGallery.map((event, index) => {
              const picks = galleryImagePicks[event.id] ?? [0, 1, 2];
              const firstImage = event.images[picks[0]] ?? event.images[0];
              const secondImage = event.images[picks[1]] ?? event.images[0];
              
              return (
                <article className="home-v2-gallery-slide" data-gallery-index={index} aria-hidden={index !== activeGallery} key={event.id}>
                  <div className="home-v2-gallery-slide-copy">
                    <p className="home-v2-gallery-count"><strong>{String(index + 1).padStart(2, "0")}</strong><span>/{String(featuredGallery.length).padStart(2, "0")}</span></p>
                    <p>{event.description}</p>
                    <a href="/galeria" tabIndex={index === activeGallery ? 0 : -1}>{copy["gallery.albumCtaLabel"]} <ArrowRight size={17} /></a>
                    <div className="home-v2-gallery-controls" aria-label={copy["gallery.controlsLabel"]}>
                      <button type="button" tabIndex={index === activeGallery ? 0 : -1} onClick={() => moveGallery(-1)} aria-label={copy["gallery.previous"]}><ArrowLeft size={19} /></button>
                      <button type="button" tabIndex={index === activeGallery ? 0 : -1} onClick={() => moveGallery(1)} aria-label={copy["gallery.next"]}><ArrowRight size={19} /></button>
                    </div>
                  </div>

                  <div className="home-v2-gallery-pair">
                    <a className="home-v2-gallery-shot" href="/galeria" tabIndex={index === activeGallery ? 0 : -1}>
                      <img src={firstImage.src} alt={firstImage.alt} loading="lazy" width={firstImage.width} height={firstImage.height} />
                      <span><small>{copy["gallery.eventLabel"]}</small><strong>{event.title}</strong></span>
                    </a>
                    <a className="home-v2-gallery-shot" href="/galeria" tabIndex={index === activeGallery ? 0 : -1}>
                      <img src={secondImage.src} alt={secondImage.alt} loading="lazy" width={secondImage.width} height={secondImage.height} />
                      <span><small>{formatGalleryDate(event.date)}</small><strong>{event.location}</strong></span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-v2-history home-v2-shell" id="historia" aria-labelledby="historia-title">
        <div className="home-v2-history-copy">
          <header className="home-v2-history-heading">
            <p className="home-v2-section-note">{copy["history.eyebrow"]}</p>
            <h2 id="historia-title"><span>{copy["history.title"]}</span><em>{copy["history.titleAccent"]}</em></h2>
          </header>
          <div className="home-v2-history-details">
            <p className="home-v2-history-lead">{copy["history.lead"]}</p>
            <div className="home-v2-history-facts" aria-label={copy["history.factsLabel"]}>
              <div><strong>{copy["history.fact1Value"]}</strong><span>{copy["history.fact1Label"]}</span></div>
              <div><strong>{copy["history.fact2Value"]}</strong><span>{copy["history.fact2Label"]}</span></div>
            </div>

            {/* [HISTORY PAGE HIDE] */}
            {/* <a className="home-v2-text-link" href="/historia">Poznaj historię zespołu <ArrowRight size={18} /></a> */}


          </div>
        </div>

        <div className="home-v2-history-visual" aria-label={copy["history.visualLabel"]}>
          <figure className="home-v2-history-photo home-v2-history-photo-old">
            <img src="/history/halka-1948.webp" alt={copy["history.oldImageAlt"]} loading="lazy" decoding="async" />
            <figcaption><span>{copy["history.oldImageLabel"]}</span><strong>{copy["history.oldImageCaption"]}</strong></figcaption>
          </figure>
          <figure className="home-v2-history-photo home-v2-history-photo-now">
            <img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 52vw" alt={copy["history.nowImageAlt"]} loading="lazy" decoding="async" />
            <figcaption><span>{copy["history.now"]}</span><strong>{copy["history.nowImageCaption"]}</strong></figcaption>
          </figure>
          <span className="home-v2-history-mark" aria-hidden="true"><i>{copy["history.start"]}</i><b>{new Date().getFullYear()}</b></span>
        </div>
      </section>

      <section className="home-v2-costumes home-v2-shell" aria-labelledby="kostiumy-title">
        <div className="home-v2-costume-copy" style={{ alignSelf: 'flex-start' }}>
          <p className="home-v2-section-note">{copy["costumes.eyebrow"]}</p>
          <h2 id="kostiumy-title">{copy["costumes.title"]}</h2>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.9vw, 2.9rem)", color: "var(--v2-red)", fontFamily: 'var(--font-display)', margin: "0.7rem 0" }}>
            {copy["costumes.titleAccent"]}
          </h2>
          <p>{copy["costumes.lead"]}</p>
          <a className="home-v2-button home-v2-button-primary" href="/kostiumy">{copy["costumes.cta"]} <ArrowRight size={19} /></a>
        </div>
        <div className="home-v2-costume-mosaic" aria-label={copy["costumes.mosaicLabel"]}>
          <figure className="home-v2-costume-tile home-v2-costume-tile-belt"><img src="/session/modal-zywiec-male-10.webp" srcSet="/home-responsive/modal-zywiec-male-10-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt={copy["costumes.tile1Alt"]} loading="lazy" decoding="async" /><figcaption>{copy["costumes.tile1Caption"]}</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-beads"><img src="/session/modal-zywiec-female-10.webp" srcSet="/home-responsive/modal-zywiec-female-10-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt={copy["costumes.tile2Alt"]} loading="lazy" decoding="async" /><figcaption>{copy["costumes.tile2Caption"]}</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-collar"><img src="/session/modal-lublin-female-13.webp" srcSet="/home-responsive/modal-lublin-female-13-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt={copy["costumes.tile3Alt"]} loading="lazy" decoding="async" /><figcaption>{copy["costumes.tile3Caption"]}</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-embroidery"><img src="/session/modal-krakow-male-07.webp" srcSet="/home-responsive/modal-krakow-male-07-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt={copy["costumes.tile4Alt"]} loading="lazy" decoding="async" /><figcaption>{copy["costumes.tile4Caption"]}</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-lace"><img src="/session/modal-lublin-female-06.webp" srcSet="/home-responsive/modal-lublin-female-06-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt={copy["costumes.tile5Alt"]} loading="lazy" decoding="async" /><figcaption>{copy["costumes.tile5Caption"]}</figcaption></figure>
        </div>
      </section>

      <section className='home-v2-contact-section-outer-wrapper'  id="kontakt" aria-labelledby="kontakt-title">
        <div className="home-v2-contact-section home-v2-shell">
          <div className="home-v2-contact-copy">
            <p className="home-v2-section-note">{copy["contact.eyebrow"]}</p>
            <h2 id="kontakt-title">{copy["contact.title"]}</h2>
            <p>{copy["contact.lead"]}</p>
            <div className="home-v2-contact-actions">
              <ContactAction href={`mailto:${shared.siteConfig.contact.email}`} actionLabel="Otwórz pocztę" icon={<EnvelopeSimple size={22} />} label={copy["contact.emailLabel"]} value={shared.siteConfig.contact.email} />
              <ContactAction href={`tel:${shared.siteConfig.contact.phone}`} actionLabel="Zadzwoń" icon={<Phone size={22} />} label={copy["contact.phoneLabel"]} value={shared.siteConfig.contact.phoneDisplay} />
              <ContactAction href={shared.siteConfig.social.messenger} actionLabel="Otwórz czat" icon={<MessengerLogo size={22} />} label="Napisz na Messengerze" value="zpit.halka" external />
              <ContactAction href={shared.siteConfig.contact.mapUrl} actionLabel="Pokaż trasę" icon={<MapPin size={22} />} label={copy["contact.addressLabel"]} value={shared.siteConfig.contact.address} external />
            </div>
            <div className="home-v2-association">
              <p>{shared.siteConfig.association.name}</p>
              <dl>
                <div><dt>{copy["contact.krsLabel"]}</dt><dd>{shared.siteConfig.association.krs}</dd></div>
                <div><dt>{copy["contact.nipLabel"]}</dt><dd>{shared.siteConfig.association.nip}</dd></div>
              </dl>
            </div>
          </div>
          <div className="home-v2-contact-aside" aria-labelledby="home-social-title">
            <div className="home-v2-social-intro">
              <h3 id="home-social-title">{copy["social.title"]}</h3>
              <p>{copy["social.lead"]}</p>
            </div>
            <div className="home-v2-socials" aria-label={copy["social.ariaLabel"]}>
              <a className="home-v2-social home-v2-social-facebook" href={shared.siteConfig.social.facebook} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaFacebookF aria-hidden="true" /></span><span><strong>{copy["social.facebookTitle"]}</strong><small>{copy["social.facebookText"]}</small></span><ArrowUpRight size={19} aria-hidden="true" /></a>
              <a className="home-v2-social home-v2-social-instagram" href={shared.siteConfig.social.instagram} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaInstagram aria-hidden="true" /></span><span><strong>{copy["social.instagramTitle"]}</strong><small>{copy["social.instagramText"]}</small></span><ArrowUpRight size={19} aria-hidden="true" /></a>
              <a className="home-v2-social home-v2-social-youtube" href={shared.siteConfig.social.youtube} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaYoutube aria-hidden="true" /></span><span><strong>{copy["social.youtubeTitle"]}</strong><small>{copy["social.youtubeText"]}</small></span><ArrowUpRight size={19} /></a>
            </div>
            <p className="home-v2-social-hint">{copy["social.hint"]}</p>
          </div>
        </div>
      </section>

      <SiteFooter shared={shared} />
    </main>
  );
}
