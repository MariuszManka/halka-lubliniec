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
  List,
  MapPin,
  Phone,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { mainNavigation, siteConfig } from "../content/site-config";
import { ScrollRosettes } from "./HeroVariants";

const contactSubject = "Zapytanie%20o%20dost%C4%99pno%C5%9B%C4%87%20zespo%C5%82u";

const performanceFormats = [
  {
    icon: Clock,
    title: "Pełna suita regionalna",
    text: "Spójny program pieśni i tańców w kostiumach danego regionu. Pełna forma może trwać około 40 minut.",
  },
  {
    icon: UsersThree,
    title: "Wybrana część zespołu",
    text: "Chór, grupa dziecięca albo balet. Dobieramy skład do charakteru wydarzenia i dostępnej przestrzeni.",
  },
  {
    icon: Check,
    title: "Cała Halka na scenie",
    text: "Wspólny występ dzieci, chóru i baletu, jeśli termin pozwala zebrać pełny skład zespołu.",
  },
] as const;

const suites = [
  {
    id: "slaska",
    name: "Suita śląska",
    label: "Program flagowy",
    description: "Najbliższa miejscu, z którego wyrasta Halka. Łączy regionalny śpiew, taniec i kostium w pełną sceniczną opowieść.",
    image: "/gallery/dzien-slaski-w-chorzowie/01.webp",
    imageAlt: "Tancerki, chór i balet Halki podczas prezentacji programu śląskiego",
    width: 1800,
    height: 1198,
  },
  {
    id: "rzeszowska",
    name: "Suita rzeszowska",
    label: "Gotowy program",
    description: "Żywiołowa forma, charakterystyczny śpiew i kostiumy, które od pierwszej chwili budują energię występu.",
    image: "/session/rzeszow-worn-2.webp",
    imageAlt: "Członkini Halki prezentująca elementy kobiecego stroju rzeszowskiego",
    width: 1467,
    height: 2200,
  },
  {
    id: "krakowska",
    name: "Suita krakowska",
    label: "Gotowy program",
    description: "Wyrazisty rytm, tempo i bogate kostiumy tworzą program dobrze rozpoznawalny przez publiczność w każdym wieku.",
    image: "/session/krakow-worn-2.webp",
    imageAlt: "Członkowie Halki w strojach krakowskich",
    width: 2200,
    height: 1467,
  },
] as const;

export function InvitePage() {
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
          <p className="invite-eyebrow"><span>Oferta występów</span><i aria-hidden="true" /></p>
          <h1 id="invite-title">Zaproś <em>Halkę</em><br />na swoją scenę.</h1>
          <p className="invite-hero-lead">Koncert, święto miasta, dożynki albo spotkanie lokalnej społeczności. Program i skład dobieramy do miejsca, czasu oraz charakteru wydarzenia.</p>
          <div className="invite-hero-actions">
            <a className="invite-button invite-button-primary" href={`mailto:${siteConfig.contact.email}?subject=${contactSubject}`}>Zapytaj o dostępność <ArrowRight size={18} weight="bold" /></a>
            <a className="invite-button invite-button-light" href="#programy">Zobacz programy</a>
          </div>
        </div>

        <div className="invite-hero-visual">
          <figure className="invite-hero-photo">
            <img
              src="/gallery/tydzien-kultury-beskidzkiej-2026/01.webp"
              alt="Tancerze Halki podczas występu na scenie w Wiśle"
              width="1800"
              height="1200"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <div className="invite-hero-note">
            <span>Program ustalamy wspólnie</span>
            <strong>Termin, miejsce i publiczność wyznaczają najlepszą formę występu.</strong>
          </div>
          <span className="invite-hero-ornament" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </section>

      <section className="invite-formats invite-shell" aria-labelledby="formats-title">
        <div className="invite-section-heading">
          <p>Elastyczny program</p>
          <h2 id="formats-title">Nie gotowy pakiet.<br /><em>Występ dla Was.</em></h2>
          <p className="invite-section-lead">Zaczynamy od rozmowy o wydarzeniu. Następnie proponujemy zakres programu, który ma sens dla danej sceny i publiczności.</p>
        </div>

        <div className="invite-format-layout">
          {performanceFormats.map(({ icon: Icon, title, text }, index) => (
            <article className={`invite-format-card invite-format-card-${index + 1}`} key={title}>
              <span className="invite-format-icon"><Icon size={25} weight="duotone" /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-suites invite-shell" id="programy" aria-labelledby="suites-title">
        <div className="invite-section-heading invite-section-heading-suites">
          <p>Gotowy repertuar</p>
          <h2 id="suites-title">Trzy regiony.<br /><em>Trzy charaktery.</em></h2>
          <p className="invite-section-lead">Publikujemy tylko programy, które są gotowe do pokazania. Planowane suity lubelska i beskidzka pozostają kierunkiem dalszej pracy.</p>
        </div>

        <div className="invite-suite-grid">
          {suites.map((suite, index) => (
            <article className={`invite-suite invite-suite-${index + 1}`} id={suite.id} key={suite.id}>
              <figure>
                <img src={suite.image} alt={suite.imageAlt} width={suite.width} height={suite.height} loading={index ? "lazy" : "eager"} decoding="async" />
              </figure>
              <div className="invite-suite-copy">
                <span>{suite.label}</span>
                <h3>{suite.name}</h3>
                <p>{suite.description}</p>
                <a href="/kostiumy">Zobacz kostiumy regionu <ArrowUpRight size={18} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="invite-process invite-shell" aria-labelledby="process-title">
        <div className="invite-process-photo">
          <img src="/session/dance-circle.webp" srcSet="/home-responsive/dance-circle-960.webp 960w, /home-responsive/dance-circle-1600.webp 1600w" sizes="(max-width: 940px) calc(100vw - 32px), 46vw" alt="Tancerka Halki widziana z góry podczas obrotu" width="2200" height="1467" loading="lazy" decoding="async" />
        </div>
        <div className="invite-process-copy">
          <p className="invite-section-label">Przed występem</p>
          <h2 id="process-title">Najpierw ustalamy, czego potrzebuje wydarzenie.</h2>
          <div className="invite-process-list">
            <div><CalendarBlank size={23} /><span><strong>Termin i miejsce</strong><small>Sprawdzamy dostępność członków oraz możliwości dojazdu.</small></span></div>
            <div><Clock size={23} /><span><strong>Długość programu</strong><small>Ustalamy pełną suitę albo krótszą, dopasowaną formę.</small></span></div>
            <div><UsersThree size={23} /><span><strong>Skład zespołu</strong><small>Potwierdzamy, które grupy mogą wystąpić w danym terminie.</small></span></div>
            <div><MapPin size={23} /><span><strong>Warunki na miejscu</strong><small>Rozmawiamy o przestrzeni, scenie i przebiegu wydarzenia.</small></span></div>
          </div>
        </div>
      </section>

      <section className="invite-stage invite-shell" aria-labelledby="stage-title">
        <div className="invite-stage-heading">
          <p>Halka na żywo</p>
          <h2 id="stage-title">Pieśń, ruch i kostium pracują razem.</h2>
          <a href="/galeria">Zobacz więcej zdjęć <ArrowRight size={18} /></a>
        </div>
        <div className="invite-stage-grid">
          <figure className="invite-stage-wide"><img src="/gallery/dzien-slaski-w-chorzowie/01.webp" alt="Występ Halki z udziałem chóru i baletu" width="1800" height="1198" loading="lazy" decoding="async" /></figure>
          <figure><img src="/session/group.webp" srcSet="/home-responsive/group-960.webp 960w" sizes="(max-width: 720px) calc(100vw - 28px), 34vw" alt="Wszystkie grupy Zespołu Pieśni i Tańca Halka" width="2200" height="1411" loading="lazy" decoding="async" /></figure>
          <figure><img src="/session/krakow-worn-2.webp" alt="Członkowie Halki prezentujący kostiumy krakowskie" width="2200" height="1467" loading="lazy" decoding="async" /></figure>
        </div>
      </section>

      <section className="invite-contact" aria-labelledby="invite-contact-title">
        <div className="invite-contact-inner invite-shell">
          <div>
            <p>Zapytaj o termin</p>
            <h2 id="invite-contact-title">Porozmawiajmy o Twoim wydarzeniu.</h2>
            <span>Ostateczny program i skład potwierdzamy po sprawdzeniu dostępności zespołu.</span>
          </div>
          <div className="invite-contact-actions">
            <a className="invite-contact-primary" href={`mailto:${siteConfig.contact.email}?subject=${contactSubject}`}><EnvelopeSimple size={21} /><span><small>Napisz do nas</small><strong>{siteConfig.contact.email}</strong></span><ArrowUpRight size={19} /></a>
            <a href={`tel:${siteConfig.contact.phone}`}><Phone size={21} /><span><small>Zadzwoń</small><strong>{siteConfig.contact.phoneDisplay}</strong></span></a>
            <a href={siteConfig.social.messenger} target="_blank" rel="noreferrer"><span><small>Messenger</small><strong>Napisz na Facebooku</strong></span><ArrowUpRight size={19} /></a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><span><small>Instagram</small><strong>@zpit_halka</strong></span><ArrowUpRight size={19} /></a>
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
