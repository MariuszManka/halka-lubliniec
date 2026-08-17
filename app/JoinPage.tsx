"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  EnvelopeSimple,
  List,
  MapPin,
  X,
} from "@phosphor-icons/react";
import { calendarEvents } from "../content/events";
import { ensembleGroups, mainNavigation, siteConfig } from "../content/site-config";
import { ScrollRosettes } from "./HeroVariants";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const responsiveImage = (src: string) =>
  src.replace("/session/", "/home-responsive/").replace(/\.webp$/, "-960.webp");

const practiceMatchesGroup = (groupId: string, title: string, groups: readonly string[]) => {
  if (groupId === "grupa-1") return title === "Próba grupy 1";
  if (groupId === "grupa-2") return title === "Próba grupy 2";
  if (groupId === "chor") return groups.includes("choir");
  return groups.includes("ballet");
};

export function JoinPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const today = new Date().toISOString().slice(0, 10);

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
    <main className="join-page">
      <ScrollRosettes />

      <header className="home-v2-header" ref={headerRef}>
        <Link className="home-v2-brand" href="/" aria-label="Halka — strona główna">
          <img src="/logo.jpg" alt="" width="46" height="46" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </Link>
        <nav className="home-v2-nav" aria-label="Główna nawigacja">
          {mainNavigation.map((item) => <Link aria-current={item.href === "/dolacz" ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="home-v2-contact" href="/#kontakt">Kontakt</Link>
        <button
          className="home-v2-menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="join-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        {menuOpen && (
          <nav className="home-v2-mobile-nav" id="join-mobile-menu" aria-label="Menu mobilne">
            {mainNavigation.map((item) => <Link aria-current={item.href === "/dolacz" ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/#kontakt">Kontakt</Link>
          </nav>
        )}
      </header>

      <section className="join-hero join-shell" aria-labelledby="join-title">
        <div className="join-hero-copy">
          <p className="join-eyebrow"><span>Nabór otwarty</span><i aria-hidden="true" /></p>
          <h1 id="join-title">Twoje miejsce<br />może być <em>w Halce.</em></h1>
          <p className="join-hero-lead">Nie prowadzimy przesłuchań i nie wymagamy doświadczenia. Wybierz grupę, sprawdź godzinę i przyjdź na próbę — bez zapisów i bez opłat.</p>
          <div className="join-hero-actions">
            <a className="join-button join-button-primary" href="#grupy">Wybierz swoją grupę <ArrowRight size={18} weight="bold" /></a>
            <a className="join-button join-button-light" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> Jak do nas trafić</a>
          </div>
          <ul className="join-hero-facts" aria-label="Najważniejsze informacje o naborze">
            <li><strong>0 zł</strong><span>udział jest bezpłatny</span></li>
            <li><strong>4</strong><span>grupy do wyboru</span></li>
            <li><strong>cały rok</strong><span>możesz dołączyć w dowolnym momencie</span></li>
          </ul>
        </div>

        <div className="join-hero-visual" aria-label="Członkowie różnych grup zespołu Halka">
          <figure className="join-hero-photo join-hero-photo-main">
            <img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 940px) calc(100vw - 32px), 48vw" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka" fetchPriority="high" decoding="async" />
          </figure>
          <figure className="join-hero-photo join-hero-photo-detail">
            <img src="/session/children-group.webp" srcSet="/home-responsive/children-group-960.webp 960w" sizes="(max-width: 620px) 42vw, 260px" alt="Najmłodsi członkowie zespołu Halka" decoding="async" />
          </figure>
          <span className="join-hero-year" aria-hidden="true">1948</span>
          <span className="join-hero-ornament" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </section>

      <section className="join-how join-shell" aria-labelledby="join-how-title">
        <div className="join-section-heading">
          <p>Najprostsza droga do zespołu</p>
          <h2 id="join-how-title">Nie zapisujesz się.<br /><em>Po prostu przychodzisz.</em></h2>
        </div>
        <ol className="join-steps">
          <li><span>01</span><div><strong>Wybierz grupę</strong><p>Dopasuj ją do wieku i tego, czy chcesz śpiewać, tańczyć, czy robić jedno i drugie.</p></div></li>
          <li><span>02</span><div><strong>Sprawdź próbę</strong><p>Terminy znajdziesz poniżej. Wszystkie zajęcia odbywają się w siedzibie zespołu.</p></div></li>
          <li><span>03</span><div><strong>Przyjdź i zobacz</strong><p>Nie musisz nic deklarować. Weź udział w zajęciach i sprawdź, czy dobrze się z nami czujesz.</p></div></li>
        </ol>
      </section>

      <section className="join-groups join-shell" id="grupy" aria-labelledby="join-groups-title">
        <div className="join-section-heading join-section-heading-groups">
          <p>Cztery grupy. Jeden zespół.</p>
          <h2 id="join-groups-title">Znajdź swój rytm.</h2>
        </div>

        <div className="join-group-list">
          {ensembleGroups.map((group, index) => {
            const nextPractices = calendarEvents
              .filter((event) => event.kind === "Próba" && event.date >= today && practiceMatchesGroup(group.id, event.title, event.groups))
              .slice(0, 2);

            return (
              <article className={`join-group-card ${index % 2 ? "join-group-card-reverse" : ""}`} id={group.id} key={group.id}>
                <figure className="join-group-image">
                  <img src={group.image} srcSet={`${responsiveImage(group.image)} 960w`} sizes="(max-width: 760px) calc(100vw - 32px), 52vw" alt={group.imageAlt} loading="lazy" decoding="async" />
                  <figcaption>{String(index + 1).padStart(2, "0")} / 04</figcaption>
                </figure>
                <div className="join-group-copy">
                  <p className="join-group-status"><i aria-hidden="true" /> Nabór otwarty</p>
                  <h3>{group.name}</h3>
                  <p className="join-group-intro">{group.age} · {group.activity}</p>
                  <p>{group.id === "grupa-1" && "Pierwsze spotkanie z folklorem przez ruch, zabawę, śpiew i pracę w grupie."}{group.id === "grupa-2" && "Śpiew i taniec rozwijane razem — z coraz większą swobodą ruchu i sceniczną pewnością."}{group.id === "chor" && "Wspólny śpiew dla młodzieży i dorosłych. Wcześniejsze przygotowanie muzyczne nie jest potrzebne."}{group.id === "balet" && "Regularna praca nad techniką i choreografią dla młodzieży i dorosłych. Zaczynamy od podstaw."}</p>
                  <div className="join-group-schedule">
                    <CalendarBlank size={22} weight="duotone" />
                    <div><small>Stały termin</small><strong>{group.schedule}</strong></div>
                  </div>
                  {nextPractices.length > 0 && (
                    <div className="join-next-practices">
                      <small>Najbliższe próby</small>
                      <ul>
                        {nextPractices.map((practice) => (
                          <li key={practice.id}><time dateTime={practice.date}>{dateFormatter.format(new Date(`${practice.date}T12:00:00`))}</time><strong>{practice.time}{practice.endTime ? `–${practice.endTime}` : ""}</strong></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a className="join-map-link" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> Siedziba zespołu <ArrowRight size={16} /></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="join-first-visit join-shell" aria-labelledby="first-visit-title">
        <div className="join-first-copy">
          <p className="join-section-label">Pierwsza próba</p>
          <h2 id="first-visit-title">Weź ciekawość.<br />Resztę pokażemy.</h2>
          <p>Na zajęcia dziecięce i taneczne warto zabrać wygodny strój sportowy, butelkę wody oraz wygodne buty na zmianę lub skarpetki. Na próbę chóru wystarczy przyjść.</p>
        </div>
        <div className="join-first-list">
          <div><CheckCircle size={24} weight="fill" /><span><strong>Bez przesłuchania</strong><small>Nie oceniamy Cię przed pierwszymi zajęciami.</small></span></div>
          <div><CheckCircle size={24} weight="fill" /><span><strong>Bez wcześniejszego doświadczenia</strong><small>Wszystkiego uczymy podczas regularnych prób.</small></span></div>
          <div><CheckCircle size={24} weight="fill" /><span><strong>Całkowicie bezpłatnie</strong><small>Udział w każdej grupie kosztuje 0 zł.</small></span></div>
        </div>
      </section>

      <section className="join-location" aria-labelledby="join-location-title">
        <div className="join-location-copy join-shell">
          <div>
            <p className="join-section-label">Tu się spotykamy</p>
            <h2 id="join-location-title">Siedziba zespołu</h2>
            <p>{siteConfig.contact.address}</p>
          </div>
          <div className="join-location-actions">
            <a className="join-button join-button-on-green" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer">Otwórz trasę w Google Maps <ArrowRight size={18} /></a>
            <a href={`mailto:${siteConfig.contact.email}`}><EnvelopeSimple size={18} /> Masz pytanie? Napisz do nas</a>
          </div>
        </div>
        <div className="join-map">
          <iframe src={siteConfig.contact.mapEmbedUrl} title="Mapa z siedzibą Zespołu Pieśni i Tańca Halka w Lublińcu" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <footer className="join-footer join-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="58" height="58" /><span><strong>HALKA</strong><small>Od 1948 roku tańczymy razem.</small></span></Link>
        <nav aria-label="Nawigacja w stopce">{mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} ZPiT Halka</p>
      </footer>
    </main>
  );
}
