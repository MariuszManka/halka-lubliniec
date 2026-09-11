"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, MapPin, X } from "@phosphor-icons/react";
import { mainNavigation } from "../content/site-config";
import type { GalleryEvent, GalleryPageContent } from "../sanity/content-types";
import { SiteHeader } from "./SiteHeader";
import { PageHero } from "./PageHero";
import { ScrollRosettes } from "./FolkRosette";

type ChroniclePageProps = {
  galleryEvents: GalleryEvent[];
  content: GalleryPageContent;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" })
    .format(new Date(`${date}T12:00:00`));

function FolkDivider() {
  return (
    <span className="gallery-folk-divider" aria-hidden="true">
      <i />
      <b><span /><span /><span /></b>
      <i />
    </span>
  );
}

export function ChroniclePage({ galleryEvents, content }: ChroniclePageProps) {
  const reduce = useReducedMotion();
  const [year, setYear] = useState<"all" | number>("all");
  const [activeEvent, setActiveEvent] = useState<GalleryEvent | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLElement>(null);
  const galleryTriggerRef = useRef<HTMLElement | null>(null);


  const years = useMemo(
    () => [...new Set(galleryEvents.map((event) => event.year))].sort((a, b) => b - a),
    [galleryEvents],
  );
  const visibleEvents = year === "all"
    ? galleryEvents
    : galleryEvents.filter((event) => event.year === year);
  const coverFocus: Record<string, string> = {
    "tydzien-kultury-beskidzkiej-2026": "50% 38%",
    "warsztaty-w-wisle": "50% 42%",
    "dzien-slaski-w-chorzowie": "50% 34%",
    "polonez-na-lublinieckim-rynku": "50% 42%",
    "dni-lublinca-2025": "50% 36%",
  };
  const closeGallery = () => {
    setActiveEvent(null);
    setActiveImage(0);
    window.requestAnimationFrame(() => galleryTriggerRef.current?.focus());
  };
  const showPrevious = () => {
    if (!activeEvent) return;
    setActiveImage((current) => (current - 1 + activeEvent.images.length) % activeEvent.images.length);
  };
  const showNext = () => {
    if (!activeEvent) return;
    setActiveImage((current) => (current + 1) % activeEvent.images.length);
  };

  useEffect(() => {
    if (!activeEvent) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "Tab") {
        const focusable = Array.from(
          lightboxRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeEvent]);

  return (
    <main className="chronicle-page">
      <ScrollRosettes />

      <SiteHeader activeHref="/galeria" />


      <PageHero titleId="gallery-hero-title"
        eyebrow={content.hero.eyebrow}
        title={<><span>{content.hero.title}</span><em>{content.hero.titleAccent}</em></>}
        lead={content.hero.lead}
        actions={<a href="#galerie">{content.hero.ctaLabel} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>}
        image={{ src: content.hero.image.src, alt: content.hero.image.alt, width: content.hero.image.width ?? 1467, height: content.hero.image.height ?? 2200, position: "50% 32%", fit: "contain" }}
        noteLabel="Opis fotografii"
        // note={<><span>{content.hero.imageLabel}</span><strong>{content.hero.imageCaption}</strong></>}
      />

      <section className="chronicle-archive section-shell" id="galerie" aria-labelledby="archive-title">
        <div className="chronicle-archive-heading">
          <div>
            <p className="section-kicker">{content.archive.eyebrow}</p>
            <h2 id="archive-title">{content.archive.title}</h2>
          </div>
          <p>{content.archive.lead}</p>
        </div>

        <div className="year-filter chronicle-year-filter" aria-label="Filtruj galerię według roku">
          <button type="button" className={year === "all" ? "active" : ""} aria-pressed={year === "all"} aria-controls="gallery-event-grid" onClick={() => setYear("all")}>{content.archive.allYearsLabel}</button>
          {years.map((item) => (
            <button type="button" key={item} className={year === item ? "active" : ""} aria-pressed={year === item} aria-controls="gallery-event-grid" onClick={() => setYear(item)}>{item}</button>
          ))}
        </div>

        <p className="gallery-results-status" role="status" aria-live="polite">
          {visibleEvents.length === 1 ? "1 galeria" : `${visibleEvents.length} galerii`}
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div className="gallery-masonry" id="gallery-event-grid" layout key={year}>
            {visibleEvents.length === 0 && (
              <p className="gallery-empty-state">{content.archive.emptyLabel}</p>
            )}
            {visibleEvents.map((event, index) => (
              <motion.article
                className={`gallery-masonry-card gallery-masonry-card-${(index % 6) + 1}`}
                key={event.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.045, ease: [0.16, 1, 0.3, 1] }}
                style={{ "--gallery-focus": event.coverFocus ?? coverFocus[event.id] ?? "50% 38%" } as React.CSSProperties}
              >
                <button
                  className="gallery-card-button"
                  type="button"
                  onClick={(clickEvent) => {
                    galleryTriggerRef.current = clickEvent.currentTarget;
                    setActiveEvent(event);
                    setActiveImage(0);
                  }}
                  aria-label={`Otwórz galerię: ${event.title}`}
                >
                  <img
                    src={event.images[0].src}
                    alt={event.images[0].alt}
                    width={event.images[0].width}
                    height={event.images[0].height}
                    loading={index < 6 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                  <span className="gallery-card-shade" aria-hidden="true" />
                  <span className="gallery-card-year">{event.year}</span>
                  <span className="gallery-card-count"><Camera size={16} /> {event.images.length}</span>
                  <span className="gallery-card-copy">
                    <span className="gallery-card-meta">
                      <span>{formatDate(event.date)}</span>
                      <span><MapPin size={14} /> {event.location}</span>
                    </span>
                    <strong>{event.title}</strong>
                    <span className="gallery-card-action">Zobacz zdjęcia <ArrowRight size={17} /></span>
                  </span>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>



      {/* TODO ŁADNA DEKORACJA SEKCJI - DO SPRAWDZENIA I WYKORZYSTANIA  */}

      {/* <section className="chronicle-return section-shell">
        <span className="chronicle-return-ornament chronicle-return-ornament-left" aria-hidden="true">
          <FolkRosette variant="asset" />
          <i /><i /><i />
        </span>
        <span className="chronicle-return-ornament chronicle-return-ornament-right" aria-hidden="true">
          <FolkRosette variant="asset" />
          <i /><i /><i />
        </span>
        <p className="section-kicker">{content.return.eyebrow}</p>
        <h2>{content.return.title}</h2>
        <p>{content.return.lead}</p>
        <a className="button button-primary" href="/historia">{content.return.ctaLabel} <ArrowRight size={18} /></a>
      </section> */}

      <footer className="footer section-shell">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="70" height="70" />
          <div><strong>HALKA</strong><span>Pieśń. Taniec. Pokolenia.</span></div>
        </div>
        <div className="footer-links">
          {mainNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
        <p>© 2026 Zespół Pieśni i Tańca Halka w Lublińcu</p>
      </footer>

      <AnimatePresence>
        {activeEvent && (
          <motion.div className="lightbox-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeGallery}>
            <motion.section
              ref={lightboxRef}
              className="lightbox"
              style={{ position: "relative" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="chronicle-lightbox-title"
              aria-describedby="chronicle-lightbox-description"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button ref={closeButtonRef} className="lightbox-close" type="button" aria-label="Zamknij galerię" onClick={closeGallery}><X size={24} /></button>
              <div className="lightbox-stage">
                <span className="lightbox-counter">{String(activeImage + 1).padStart(2, "0")} / {String(activeEvent.images.length).padStart(2, "0")}</span>
                <button type="button" className="lightbox-arrow previous" aria-label="Poprzednie zdjęcie" onClick={showPrevious}><ArrowLeft size={24} /></button>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeEvent.images[activeImage].src}
                    src={activeEvent.images[activeImage].src}
                    alt={activeEvent.images[activeImage].alt}
                    width={activeEvent.images[activeImage].width}
                    height={activeEvent.images[activeImage].height}
                    initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  />
                </AnimatePresence>
                <button type="button" className="lightbox-arrow next" aria-label="Następne zdjęcie" onClick={showNext}><ArrowRight size={24} /></button>
              </div>
              <aside className="lightbox-sidebar">
                <p className="section-kicker">{formatDate(activeEvent.date)}</p>
                <h2 id="chronicle-lightbox-title">{activeEvent.title}</h2>
                <p className="lightbox-description" id="chronicle-lightbox-description">{activeEvent.description}</p>
                {activeEvent.images[activeImage].caption && (
                  <p className="lightbox-photo-caption">{activeEvent.images[activeImage].caption}</p>
                )}
                <dl className="lightbox-details">
                  <div><dt>Miejsce</dt><dd>{activeEvent.location}</dd></div>
                  <div><dt>Zdjęcia</dt><dd>{activeEvent.images.length}</dd></div>
                  <div><dt>Autor</dt><dd>{activeEvent.credit}</dd></div>
                </dl>
                <div className="lightbox-thumbnails" aria-label="Wybierz zdjęcie">
                  {activeEvent.images.map((image, index) => (
                    <button
                      type="button"
                      className={activeImage === index ? "active" : ""}
                      aria-label={`Pokaż zdjęcie ${index + 1}`}
                      aria-pressed={activeImage === index}
                      onClick={() => setActiveImage(index)}
                      key={image.src}
                    >
                      <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
                    </button>
                  ))}
                </div>
                <p className="lightbox-hint">Użyj strzałek klawiatury lub przycisków na zdjęciu.</p>
              </aside>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
