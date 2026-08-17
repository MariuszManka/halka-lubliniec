"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  List,
  MapPin,
  Phone,
  YoutubeLogo,
  X,
} from "@phosphor-icons/react";
import { calendarEvents, eventGroups } from "../content/events";
import { galleryEvents } from "../content/generated-gallery";
import { ensembleGroups, mainNavigation, readySuites, siteConfig } from "../content/site-config";
import { DanceHero, ScrollRosettes } from "./HeroVariants";

const monthShort = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

const formatGalleryDate = (date: string) => new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(`${date}T12:00:00`));

export function HalkaHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const upcomingPerformances = calendarEvents
    .filter((event) => event.kind === "Występ" && (event.endDate ?? event.date) >= today)
    .slice(0, 4);
  const featuredGallery = [...galleryEvents]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main className="home-v2">
      <ScrollRosettes />

      <header className="home-v2-header">
        <a className="home-v2-brand" href="#poczatek" aria-label="Halka — przejdź na początek strony">
          <img src="/logo.jpg" alt="" width="46" height="46" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </a>
        <nav className="home-v2-nav" aria-label="Główna nawigacja">
          {mainNavigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="home-v2-contact" href="#kontakt">Kontakt</a>
        <button
          className="home-v2-menu-button"
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        {menuOpen && (
          <nav className="home-v2-mobile-nav" aria-label="Menu mobilne">
            {mainNavigation.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
          </nav>
        )}
      </header>

      <DanceHero />

      <section className="home-v2-join home-v2-shell" id="dolacz" aria-labelledby="dolacz-title">
        <div className="home-v2-join-heading">
          <p className="home-v2-section-note">Nabór otwarty przez cały rok</p>
          <h2 id="dolacz-title">
            <span>Znajdź swoje miejsce</span>
            <em>w Halce.</em>
          </h2>
          <div className="home-v2-join-intro">
            <p>
              Nie wymagamy doświadczenia ani przesłuchań. Wybierz grupę i przyjdź na najbliższą próbę.
              Pierwsze spotkanie nic nie kosztuje, podobnie jak późniejszy udział w zespole.
            </p>
            <a className="home-v2-text-link" href="/dolacz">Jak wygląda pierwsza próba <ArrowRight size={18} /></a>
          </div>
        </div>

        <div className="home-v2-group-list">
          {ensembleGroups.map((group, index) => (
            <a className="home-v2-group-row" href={`/dolacz#${group.id}`} key={group.id}>
              <figure className="home-v2-group-photo">
                <img src={group.image} alt={group.imageAlt} loading="lazy" />
              </figure>
              <div className="home-v2-group-copy">
                <div className="home-v2-group-meta">
                  <span className="home-v2-group-index">0{index + 1}</span>
                  <span>{group.age}</span>
                </div>
                <div className="home-v2-group-name"><h3>{group.name}</h3></div>
                <div className="home-v2-group-details">
                  <div><small>Zajęcia</small><strong>{group.activity}</strong></div>
                  <div><small>Próby</small><strong>{group.schedule}</strong></div>
                </div>
                <span className="home-v2-group-action">Sprawdź najbliższą próbę <ArrowRight size={19} /></span>
              </div>
            </a>
          ))}
        </div>

        <div className="home-v2-join-footer">
          <p><strong>Wszystkie próby odbywają się w siedzibie zespołu.</strong> ul. Stalmacha 12 w Lublińcu.</p>
          <a href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> Pokaż na mapie</a>
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

            <div className="home-v2-offer-formats" aria-label="Możliwe formaty występu">
              <div><strong>Pełna suita</strong><span>Pieśni i tańce, około 40 minut</span></div>
              <div><strong>Wybrana grupa</strong><span>Chór, dzieci albo balet reprezentacyjny</span></div>
            </div>

            <div className="home-v2-offer-actions">
              <a className="home-v2-button home-v2-button-primary" href="/zapros-halke">Poznaj ofertę występów <ArrowRight size={19} /></a>
              <a className="home-v2-offer-mail" href={`mailto:${siteConfig.contact.email}?subject=Zapytanie%20o%20dostępność%20zespołu`}>Zapytaj o dostępność</a>
            </div>
          </div>

          <div className="home-v2-offer-showcase">
            <figure className="home-v2-offer-image">
              <img src="/session/group.webp" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka na scenie" loading="lazy" />
              <figcaption>Program dobieramy do miejsca, czasu i charakteru wydarzenia.</figcaption>
            </figure>

            <div className="home-v2-suite-list" aria-label="Gotowe suity zespołu">
              <div className="home-v2-suite-heading"><span>Gotowy repertuar</span><strong>Trzy suity sceniczne</strong></div>
              {readySuites.map((suite, index) => (
                <div className={`home-v2-suite${index === 0 ? " home-v2-suite-featured" : ""}`} key={suite.id}>
                  <span className="home-v2-suite-index">0{index + 1}</span>
                  <div><small>{suite.label}</small><strong>{suite.name}</strong></div>
                  <p>{suite.description}</p>
                </div>
              ))}
            </div>
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
          <section className="home-v2-fixed-plan" aria-labelledby="staly-plan-title">
            <div className="home-v2-fixed-plan-heading">
              <div>
                <span><CalendarBlank size={18} /> Stały plan</span>
                <h3 id="staly-plan-title">Regularne próby w siedzibie zespołu</h3>
              </div>
              <a href="/wydarzenia#proby">Wszystkie terminy prób <ArrowRight size={17} /></a>
            </div>
            <div className="home-v2-fixed-plan-grid">
              {ensembleGroups.map((group) => (
                <div key={group.id}>
                  <span>{group.name}</span>
                  <strong>{group.schedule}</strong>
                </div>
              ))}
            </div>
          </section>
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

      <section className="home-v2-gallery home-v2-shell" aria-labelledby="galeria-title">
        <div className="home-v2-section-heading">
          <div>
            <p className="home-v2-section-note">Halka na scenie</p>
            <h2 id="galeria-title">Zobacz nas w ruchu.</h2>
          </div>
          <div className="home-v2-section-intro">
            <p>Koncerty, festiwale i spotkania, podczas których pieśń, ruch i kostium tworzą jeden obraz.</p>
            <a className="home-v2-text-link" href="/galeria">Przejdź do galerii <ArrowRight size={18} /></a>
          </div>
        </div>
        <div className="home-v2-gallery-grid">
          {featuredGallery.map((event, index) => (
            <a className={`home-v2-gallery-card home-v2-gallery-card-${index + 1}`} href="/galeria" key={event.id}>
              <img src={event.images[0].src} alt={event.images[0].alt} loading="lazy" width={event.images[0].width} height={event.images[0].height} />
              <div><span>{formatGalleryDate(event.date)} · {event.location}</span><h3>{event.title}</h3><p>{event.images.length} zdjęć</p></div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-v2-history" id="historia" aria-labelledby="historia-title">
        <div className="home-v2-history-photo">
          <img src="/session/group.webp" alt="Współczesny skład Zespołu Pieśni i Tańca Halka" loading="lazy" />
          <span>Dziś</span>
        </div>
        <div className="home-v2-history-copy">
          <p className="home-v2-section-note">Historia, która nadal trwa</p>
          <p className="home-v2-history-year">1948</p>
          <h2 id="historia-title">Kolejne pokolenia. Ta sama Halka.</h2>
          <p>
            Zespół powstał w Lublińcu w 1948 roku. Z czasem zmieniały się sceny, składy i programy,
            ale nie zmieniła się potrzeba wspólnego śpiewania, tańczenia i przekazywania tradycji dalej.
          </p>
          <a className="home-v2-text-link home-v2-text-link-light" href="/historia">Poznaj historię zespołu <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="home-v2-costumes home-v2-shell" aria-labelledby="kostiumy-title">
        <div className="home-v2-costume-copy">
          <p className="home-v2-section-note">Różne regiony · jedna kolekcja</p>
          <h2 id="kostiumy-title">Kostium opowiada, zanim zacznie się taniec.</h2>
          <p>
            Każdy haft, pas i sposób wiązania ma własne znaczenie. Poznaj stroje, w których Halka
            prezentuje różnorodność polskich regionów — nie tylko jako kolekcję, ale część scenicznej opowieści.
          </p>
          <a className="home-v2-button home-v2-button-primary" href="/kostiumy">Odkryj kostiumy <ArrowRight size={19} /></a>
        </div>
        <div className="home-v2-costume-images">
          <figure className="home-v2-costume-main"><img src="/session/krakow-worn-1.webp" alt="Para Halki w strojach Krakowiaków Zachodnich" loading="lazy" /></figure>
          <figure className="home-v2-costume-detail"><img src="/session/zywiec-male-detail.webp" alt="Zdobiony skórzany pas stroju Górali Żywieckich" loading="lazy" /></figure>
        </div>
      </section>

      <section className="home-v2-contact-section home-v2-shell" id="kontakt" aria-labelledby="kontakt-title">
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
        <div className="home-v2-socials" aria-label="Media społecznościowe Halki">
          <a className="home-v2-social home-v2-social-facebook" href={siteConfig.social.facebook} target="_blank" rel="noreferrer"><FacebookLogo size={31} weight="fill" /><span><strong>Facebook</strong><small>Aktualności i wydarzenia</small></span><ArrowUpRight size={19} /></a>
          <a className="home-v2-social home-v2-social-instagram" href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={31} weight="bold" /><span><strong>Instagram</strong><small>Kulisy i zdjęcia</small></span><ArrowUpRight size={19} /></a>
          <a className="home-v2-social home-v2-social-youtube" href={siteConfig.social.youtube} target="_blank" rel="noreferrer"><YoutubeLogo size={32} weight="fill" /><span><strong>YouTube</strong><small>Występy i nagrania</small></span><ArrowUpRight size={19} /></a>
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
