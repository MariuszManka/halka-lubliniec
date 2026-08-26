"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, House, List, MapPin, X } from "@phosphor-icons/react";
import { galleryEvents } from "../content/generated-gallery";

type GalleryEvent = (typeof galleryEvents)[number];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" })
    .format(new Date(`${date}T12:00:00`));

const navItems = [
  ["Galeria", "/galeria"],
  ["Kostiumy", "/kostiumy"],
  ["Historia", "/#historia"],
  ["Terminarz", "/#terminarz"],
  ["Kontakt", "/#kontakt"],
] as const;

function FolkRosette() {
  return (
    <span className="folk-rosette">
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ "--petal": index } as React.CSSProperties} />
      ))}
      <b />
    </span>
  );
}

function FolkDivider() {
  return (
    <span className="gallery-folk-divider" aria-hidden="true">
      <i />
      <b><span /><span /><span /></b>
      <i />
    </span>
  );
}

function ChronicleBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const leftY = useTransform(scrollYProgress, [0, 1], [-80, 240]);
  const rightY = useTransform(scrollYProgress, [0, 1], [180, -170]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-25, 105]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [40, -95]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [60, -220]);

  return (
    <div className="folk-backdrop chronicle-folk-backdrop" aria-hidden="true">
      <motion.div className="chronicle-stitch-ribbon" style={reduce ? undefined : { y: ribbonY }}>
        {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
      </motion.div>
      <motion.div
        className="chronicle-page-rosette chronicle-page-rosette-left"
        style={reduce ? undefined : { y: leftY, rotate: leftRotate }}
      >
        <FolkRosette />
      </motion.div>
      <motion.div
        className="chronicle-page-rosette chronicle-page-rosette-right"
        style={reduce ? undefined : { y: rightY, rotate: rightRotate }}
      >
        <FolkRosette />
      </motion.div>
    </div>
  );
}

export function ChroniclePage() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState<"all" | number>("all");
  const [activeEvent, setActiveEvent] = useState<GalleryEvent | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const years = useMemo(
    () => [...new Set(galleryEvents.map((event) => event.year))].sort((a, b) => b - a),
    [],
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
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeEvent]);

  return (
    <main className="chronicle-page">
      <ChronicleBackdrop />

      <header className="site-header chronicle-site-header">
        <a className="brand" href="/" aria-label="Halka, wróć na stronę główną">
          <img src="/logo.jpg" alt="" width="48" height="48" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {navItems.map(([label, href]) => (
            <a className={href === "/galeria" ? "active" : ""} key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="header-cta chronicle-home-link" href="/"><House size={17} /> Strona główna</a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              aria-label="Menu mobilne"
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <a href="/" onClick={() => setMenuOpen(false)}>Strona główna</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="chronicle-hero section-shell">
        <motion.div
          className="chronicle-hero-copy"
          initial={reduce ? false : { opacity: 0, x: -26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <a className="chronicle-breadcrumb" href="/"><ArrowLeft size={16} /> Strona główna</a>
          <p className="section-kicker">Galeria Zespołu Halka</p>
          <h1>Galeria</h1>
          <FolkDivider />
          <p>Koncerty, warsztaty i spotkania zapisane w kadrach. Każda galeria to osobna opowieść o ludziach, ruchu i tradycji.</p>
        </motion.div>

        <motion.figure
          className="gallery-hero-costume"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gallery-costume-frame">
            <motion.img
              src="/session/modal-zywiec-female-04.webp"
              alt="Barwny haft stroju żywieckiego Zespołu Halka"
              width="1467"
              height="2200"
              loading="eager"
              initial={reduce ? false : { scale: 1.07 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="gallery-costume-glow" />
          </div>
          <figcaption><span>Sesja zdjęciowa</span><strong>Detal, który niesie tradycję.</strong></figcaption>
          <span className="gallery-costume-stitch" aria-hidden="true" />
        </motion.figure>
      </section>

      <section className="chronicle-archive section-shell" aria-labelledby="archive-title">
        <div className="chronicle-archive-heading">
          <div>
            <p className="section-kicker">Galerie według lat</p>
            <h2 id="archive-title">Wybierz rok. Zobacz wydarzenie.</h2>
          </div>
          <p>W każdym roku może pojawić się dowolna liczba koncertów i realizacji. Każde wydarzenie otwiera osobny zestaw fotografii.</p>
        </div>

        <div className="year-filter chronicle-year-filter" aria-label="Filtruj galerię według roku">
          <button type="button" className={year === "all" ? "active" : ""} aria-pressed={year === "all"} onClick={() => setYear("all")}>Wszystkie lata</button>
          {years.map((item) => (
            <button type="button" key={item} className={year === item ? "active" : ""} aria-pressed={year === item} onClick={() => setYear(item)}>{item}</button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div className="gallery-masonry" layout key={year}>
            {visibleEvents.map((event, index) => (
              <motion.article
                className={`gallery-masonry-card gallery-masonry-card-${(index % 6) + 1}`}
                key={event.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.045, ease: [0.16, 1, 0.3, 1] }}
                style={{ "--gallery-focus": coverFocus[event.id] ?? "50% 38%" } as React.CSSProperties}
              >
                <button
                  className="gallery-card-button"
                  type="button"
                  onClick={() => { setActiveEvent(event); setActiveImage(0); }}
                  aria-label={`Otwórz galerię: ${event.title}`}
                >
                  <img
                    src={event.images[0].src}
                    alt={event.images[0].alt}
                    width={event.images[0].width}
                    height={event.images[0].height}
                    loading="lazy"
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

      <section className="chronicle-return section-shell">
        <span className="chronicle-return-ornament chronicle-return-ornament-left" aria-hidden="true">
          <FolkRosette />
          <i /><i /><i />
        </span>
        <span className="chronicle-return-ornament chronicle-return-ornament-right" aria-hidden="true">
          <FolkRosette />
          <i /><i /><i />
        </span>
        <p className="section-kicker">Poza kadrem</p>
        <h2>Poznaj Halkę bliżej.</h2>
        <p>Zobacz historię zespołu, najbliższe wydarzenia i miejsca, w których można nas spotkać.</p>
        <a className="button button-primary" href="/#historia">Wróć do opowieści <ArrowRight size={18} /></a>
      </section>

      <footer className="footer section-shell">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="70" height="70" />
          <div><strong>HALKA</strong><span>Pieśń. Taniec. Pokolenia.</span></div>
        </div>
        <div className="footer-links">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <p>© 2026 Zespół Pieśni i Tańca Halka w Lublińcu</p>
      </footer>

      <AnimatePresence>
        {activeEvent && (
          <motion.div className="lightbox-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeGallery}>
            <motion.section
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="chronicle-lightbox-title"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
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
                <button className="lightbox-close" type="button" aria-label="Zamknij galerię" onClick={closeGallery}><X size={24} /></button>
                <p className="section-kicker">{formatDate(activeEvent.date)}</p>
                <h2 id="chronicle-lightbox-title">{activeEvent.title}</h2>
                <p className="lightbox-description">{activeEvent.description}</p>
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
