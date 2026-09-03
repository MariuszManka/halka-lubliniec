"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  EnvelopeSimple,
  List,
  MapPin,
  Phone,
  X,
} from "@phosphor-icons/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { calendarEvents, eventGroups } from "../content/events";
import { galleryEvents } from "../content/generated-gallery";
import { ensembleGroups, mainNavigation, siteConfig } from "../content/site-config";
import { DanceHero, ScrollRosettes } from "./HeroVariants";

const monthShort = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

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

export function HalkaHome() {
  const UPCOMING_PERFORMANCES_AMOUNT = 3;
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const galleryRailRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const upcomingPerformances = calendarEvents
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

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <main className="home-v2">
      <a className="home-v2-skip-link" href="#dolacz">Przejdź do głównej treści</a>
      <ScrollRosettes />

      <header className="home-v2-header" ref={headerRef}>
        <a className="home-v2-brand" href="#poczatek" aria-label="Halka — przejdź na początek strony">
          <img src="/logo.jpg" alt="" width="46" height="46" />
          <span><strong>Halka</strong><small>Lubliniec</small></span>
        </a>
        <nav className="home-v2-nav" aria-label="Główna nawigacja">
          {mainNavigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="home-v2-contact" href="#kontakt">Kontakt</a>
        <button
          className="home-v2-menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="home-v2-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        {menuOpen && (
          <nav className="home-v2-mobile-nav" id="home-v2-mobile-menu" aria-label="Menu mobilne">
            {mainNavigation.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
          </nav>
        )}
      </header>

      <DanceHero />

      <section className="home-v2-join home-v2-shell" id="dolacz" aria-labelledby="dolacz-title">
        <div className="home-v2-join-layout">
          <p className="home-v2-section-note">Nabór otwarty przez cały rok</p>
          <h2 className="dolacz-title" id="dolacz-title">
            <span>Znajdź swoje miejsce</span>
            <em>w Halce.</em>
          </h2>
          <aside className="home-v2-join-signal" aria-label="Cztery grupy, jeden zespół">
            <span className="home-v2-join-count" aria-hidden="true">04</span>
            <p><strong>grupy.</strong><span>jeden zespół.</span></p>
            <div className="home-v2-join-facts">
              <span>od 6 lat</span>
              <span>bez przesłuchań</span>
              <span>zajęcia darmowe</span>
            </div>
          </aside>

          <div className="home-v2-group-list home-v2-group-list-compact">
            {ensembleGroups.map((group, index) => (
              <a className="home-v2-group-row" href={`/dolacz#${group.id}`} key={group.id}>
                <div className="home-v2-group-copy">
                  <div className="home-v2-group-meta">
                    <span className="home-v2-group-index">0{index + 1}</span>
                    <span>{group.age}</span>
                  </div>
                  <div className="home-v2-group-name"><h3>{group.name}</h3></div>
                  <p>{group.activity}</p>
                  <span className="home-v2-group-action">Poznaj grupę <ArrowRight size={19} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-v2-offer" id="zapros" aria-labelledby="zapros-title">
        <div className="home-v2-offer-shell home-v2-shell">
          <div className="home-v2-offer-copy">
            <p className="home-v2-section-note">Dla organizatorów</p>
            <h2 id="zapros-title">Zaproś Halkę.</h2>
            <p className="home-v2-offer-lead">
              Możemy przygotować pełną suitę, występ chóru, grupy dziecięcej albo całego zespołu.
              Ostateczny program i skład ustalamy wspólnie, zależnie od terminu oraz dostępności członków.
            </p>

            <div className="home-v2-offer-actions">
              <a className="home-v2-button home-v2-button-primary" href="/zapros-halke">Poznaj ofertę występów <ArrowRight size={19} /></a>
              <a className="home-v2-offer-mail" href={`mailto:${siteConfig.contact.email}?subject=Zapytanie%20o%20dostępność%20zespołu`}>Zapytaj o dostępność</a>
            </div>
          </div>

          <div className="home-v2-offer-showcase">
            <figure className="home-v2-offer-image">
              {/* <img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 48vw" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka na scenie" loading="lazy" decoding="async" /> */}
              <img src="gallery\dni-lublinca-2025\14.webp" srcSet="/home-responsive/group-alt.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 48vw" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka na scenie" loading="lazy" decoding="async" />
            </figure>

          </div>
        </div>
      </section>

      <section className="home-v2-events home-v2-shell" id="wydarzenia" aria-labelledby="wydarzenia-title">
        <div className="home-v2-section-heading home-v2-section-heading-compact">
          <div>
            <p className="home-v2-section-note">Najbliższe występy</p>
            <h2 id="wydarzenia-title">Spotkajmy się pod sceną.</h2>
          </div>
          <a className="home-v2-text-link" href="/wydarzenia">Wszystkie wydarzenia <ArrowRight size={18} /></a>
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
                  {event.groups.map((group) => <span key={group}>{eventGroups[group].label}</span>)}
                </div>
                <ArrowUpRight className="home-v2-event-arrow" size={21} />
              </a>
            );
          }) : (
            <div className="home-v2-events-empty"><CalendarBlank size={26} /><p>Nowe terminy występów pojawią się tutaj po ich potwierdzeniu.</p></div>
          )}
        </div>
      </section>

      <section className="home-v2-gallery-panel" aria-labelledby="galeria-title">
        <div className='home-v2-gallery-panel-outer-wrapper'>
          <div className="home-v2-gallery-showcase-heading">
            <div>
              <p className="home-v2-section-note">Halka na scenie</p>
              <h2 id="galeria-title">Zobacz nas<br />w ruchu.</h2>
            </div>
            <p style={{ borderRight: "4px solid var(--v2-red)", paddingRight: "12px", textAlign: "right", alignSelf: "center" }}>
              Sceny, festiwale i spotkania, podczas których tworzymy wspólną opowieść. Każdy występ to inna scena, publiczność i emocje, które zostają z nami na długo.
            </p>
          </div>

          <div
            className="home-v2-gallery-rail"
            aria-label="Najnowsze galerie. Przewiń poziomo, aby zobaczyć kolejne wydarzenie."
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
                    <a href="/galeria" tabIndex={index === activeGallery ? 0 : -1}>Zobacz cały album <ArrowRight size={17} /></a>
                    <div className="home-v2-gallery-controls" aria-label="Sterowanie galerią">
                      <button type="button" tabIndex={index === activeGallery ? 0 : -1} onClick={() => moveGallery(-1)} aria-label="Poprzednie wydarzenie"><ArrowLeft size={19} /></button>
                      <button type="button" tabIndex={index === activeGallery ? 0 : -1} onClick={() => moveGallery(1)} aria-label="Następne wydarzenie"><ArrowRight size={19} /></button>
                    </div>
                  </div>

                  <div className="home-v2-gallery-pair">
                    <a className="home-v2-gallery-shot" href="/galeria" tabIndex={index === activeGallery ? 0 : -1}>
                      <img src={firstImage.src} alt={firstImage.alt} loading="lazy" width={firstImage.width} height={firstImage.height} />
                      <span><small>Wydarzenie</small><strong>{event.title}</strong></span>
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
            <p className="home-v2-section-note">Historia, która nadal trwa</p>
            <p className="home-v2-history-kicker"><span>1948</span><i aria-hidden="true" /><strong>Dziś</strong></p>
            <h2 id="historia-title"><span>Od 1948 roku</span><em>tańczymy razem.</em></h2>
          </header>
          <div className="home-v2-history-details">
            <p className="home-v2-history-lead">
              Zmieniały się pokolenia, sceny i repertuar. Halka pozostała miejscem, w którym pieśni i tańce
              są przekazywane dalej — nie jako zamknięte archiwum, lecz żywa część wspólnego życia.
            </p>
            <div className="home-v2-history-facts" aria-label="Halka w liczbach">
              <div><strong>75+</strong><span>lat działalności</span></div>
              <div><strong>4</strong><span>działające grupy</span></div>
            </div>
            <a className="home-v2-text-link" href="/historia">Poznaj historię zespołu <ArrowRight size={18} /></a>
          </div>
        </div>

        <div className="home-v2-history-visual" aria-label="Halka dawniej i dziś">
          <figure className="home-v2-history-photo home-v2-history-photo-old">
            <img src="/history/halka-1948.webp" alt="Archiwalne zdjęcie pierwszego składu Zespołu Pieśni i Tańca Halka z 1948 roku" loading="lazy" decoding="async" />
            <figcaption><span>Kiedyś · 1948</span><strong>Pierwszy skład Halki</strong></figcaption>
          </figure>
          <figure className="home-v2-history-photo home-v2-history-photo-now">
            <img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 52vw" alt="Współczesny skład Zespołu Pieśni i Tańca Halka" loading="lazy" decoding="async" />
            <figcaption><span>Dziś</span><strong>Kolejne pokolenia na jednej scenie</strong></figcaption>
          </figure>
          <span className="home-v2-history-mark" aria-hidden="true"><i>1948</i><b>Dziś</b></span>
        </div>
      </section>

      <section className="home-v2-costumes home-v2-shell" aria-labelledby="kostiumy-title">
        <div className="home-v2-costume-copy" style={{ alignSelf: 'flex-start' }}>
          <p className="home-v2-section-note">Różne regiony · jedna kolekcja</p>
          <h2 id="kostiumy-title">Kostium</h2>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.9vw, 2.9rem)", color: "var(--v2-red)", fontFamily: 'var(--font-sans)', margin: "0.7rem 0" }}>
            opowiada zanim zacznie się taniec
          </h2>
          <p>
            Każdy haft, pas i sposób wiązania ma własne znaczenie. Poznaj stroje, w których Halka
            prezentuje różnorodność polskich regionów — nie tylko jako kolekcję, ale część scenicznej opowieści.
          </p>
          <a className="home-v2-button home-v2-button-primary" href="/kostiumy">Odkryj kostiumy <ArrowRight size={19} /></a>
        </div>
        <div className="home-v2-costume-mosaic" aria-label="Detale kostiumów scenicznych Halki">
          <figure className="home-v2-costume-tile home-v2-costume-tile-belt"><img src="/session/modal-zywiec-male-10.webp" srcSet="/home-responsive/modal-zywiec-male-10-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt="Zdobiony skórzany pas stroju Górali Żywieckich" loading="lazy" decoding="async" /><figcaption>Pas góralski</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-beads"><img src="/session/modal-zywiec-female-10.webp" srcSet="/home-responsive/modal-zywiec-female-10-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt="Kwiatowy haft kobiecego stroju Górali Żywieckich" loading="lazy" decoding="async" /><figcaption>Haft żywiecki</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-collar"><img src="/session/modal-lublin-female-13.webp" srcSet="/home-responsive/modal-lublin-female-13-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt="Wielobarwne wstążki kobiecego stroju lubelskiego" loading="lazy" decoding="async" /><figcaption>Wstążki</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-embroidery"><img src="/session/modal-krakow-male-07.webp" srcSet="/home-responsive/modal-krakow-male-07-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt="Haftowany granatowy kaftan stroju Krakowiaków Zachodnich" loading="lazy" decoding="async" /><figcaption>Haft krakowski</figcaption></figure>
          <figure className="home-v2-costume-tile home-v2-costume-tile-lace"><img src="/session/modal-lublin-female-06.webp" srcSet="/home-responsive/modal-lublin-female-06-960.webp 960w" sizes="(max-width: 940px) 46vw, 24vw" alt="Haftowany kołnierz i korale kobiecego stroju lubelskiego" loading="lazy" decoding="async" /><figcaption>Kołnierz</figcaption></figure>
        </div>
      </section>

      <section className='home-v2-contact-section-outer-wrapper'  id="kontakt" aria-labelledby="kontakt-title">
        <div className="home-v2-contact-section home-v2-shell">
          <div className="home-v2-contact-copy">
            <p className="home-v2-section-note">Kontakt</p>
            <h2 id="kontakt-title">Porozmawiajmy.</h2>
            <p>
              Chcesz dołączyć, zaprosić Halkę albo zapytać o współpracę? Wybierz najwygodniejszy kontakt.
              Bieżące informacje publikujemy również w mediach społecznościowych.
            </p>
            <div className="home-v2-contact-actions">
              <a href={`mailto:${siteConfig.contact.email}`}><EnvelopeSimple size={22} /><span><small>Napisz do nas</small><strong>{siteConfig.contact.email}</strong></span></a>
              <a href={`tel:${siteConfig.contact.phone}`}><Phone size={22} /><span><small>Zadzwoń</small><strong>{siteConfig.contact.phoneDisplay}</strong></span></a>
              <a href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={22} /><span><small>Siedziba zespołu</small><strong>{siteConfig.contact.address}</strong></span></a>
            </div>
          </div>
          <div className="home-v2-contact-aside">
            <div className="home-v2-socials" aria-label="Media społecznościowe Halki">
              <a className="home-v2-social home-v2-social-facebook" href={siteConfig.social.facebook} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaFacebookF aria-hidden="true" /></span><span><strong>Facebook</strong><small>Aktualności i wydarzenia</small></span><ArrowUpRight size={19} /></a>
              <a className="home-v2-social home-v2-social-instagram" href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaInstagram aria-hidden="true" /></span><span><strong>Instagram</strong><small>Kulisy i zdjęcia</small></span><ArrowUpRight size={19} /></a>
              <a className="home-v2-social home-v2-social-youtube" href={siteConfig.social.youtube} target="_blank" rel="noreferrer"><span className="home-v2-social-logo"><FaYoutube aria-hidden="true" /></span><span><strong>YouTube</strong><small>Występy i nagrania</small></span><ArrowUpRight size={19} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-v2-footer home-v2-shell">
        <div className="home-v2-footer-brand"><img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="58" height="58" /><span><strong>HALKA</strong><small>Od 1948 roku tańczymy razem.</small></span></div>
        <nav aria-label="Nawigacja w stopce">{mainNavigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
        <p>© 2026 Zespół Pieśni i Tańca Halka w Lublińcu</p>
      </footer>
    </main>
  );
}
