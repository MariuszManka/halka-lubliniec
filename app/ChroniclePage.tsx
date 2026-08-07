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
  const visibleYears = year === "all" ? years : years.filter((item) => item === year);
  const totalPhotos = galleryEvents.reduce((sum, event) => sum + event.images.length, 0);
  const heroEvent = galleryEvents[0];
  const heroImage = heroEvent.images.find((image) => image.width > image.height) ?? heroEvent.images[0];

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
        <motion.figure
          className="gallery-hero-visual"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gallery-hero-primary">
            <motion.img
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              loading="eager"
              initial={reduce ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="gallery-hero-shade" />
            <motion.div
              className="chronicle-hero-copy"
              initial={reduce ? false : { opacity: 0, x: -26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <a className="chronicle-breadcrumb" href="/"><ArrowLeft size={16} /> Strona główna</a>
              <p className="section-kicker">Galeria Zespołu Halka</p>
              <h1>Tradycja <em>w każdym kadrze.</em></h1>
              <p>Koncerty, warsztaty i podróże widziane z bliska. Otwórz wydarzenie i zobacz Halkę w ruchu.</p>
            </motion.div>
            <figcaption>
              <span>{formatDate(heroEvent.date)} · {heroEvent.location}</span>
              <strong>{heroEvent.title}</strong>
            </figcaption>
          </div>
          <div className="gallery-hero-filmstrip" aria-label="Wybrane kadry">
            {heroEvent.images.slice(1, 4).map((image, index) => (
              <motion.button
                type="button"
                key={image.src}
                onClick={() => { setActiveEvent(heroEvent); setActiveImage(index + 1); }}
                aria-label={`Otwórz zdjęcie ${index + 2} z galerii ${heroEvent.title}`}
                initial={reduce ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.32 + index * 0.08 }}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
                <span>0{index + 2}</span>
              </motion.button>
            ))}
            <button className="gallery-hero-open" type="button" onClick={() => { setActiveEvent(heroEvent); setActiveImage(0); }}>
              <Camera size={20} /> Otwórz galerię
            </button>
          </div>
        </motion.figure>
        <motion.div
          className="chronicle-hero-stats"
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div><strong>{galleryEvents.length}</strong><span>galerie wydarzeń</span></div>
          <div><strong>{totalPhotos}</strong><span>fotografii</span></div>
          <div><strong>{years.length}</strong><span>lata w galerii</span></div>
        </motion.div>
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
          <motion.div className="chronicle-years" layout>
            {visibleYears.map((itemYear) => {
              const events = galleryEvents.filter((event) => event.year === itemYear);
              const photos = events.reduce((sum, event) => sum + event.images.length, 0);
              return (
                <motion.section
                  className="chronicle-year-group"
                  id={`rok-${itemYear}`}
                  key={itemYear}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.45 }}
                >
                  <header className="chronicle-year-heading">
                    <strong>{itemYear}</strong>
                    <span>{events.length} {events.length === 1 ? "wydarzenie" : "wydarzenia"} · {photos} zdjęć</span>
                  </header>
                  <div className="archive-events-grid">
                    {events.map((event, index) => (
                      <motion.article
                        className={`archive-event-card ${index === 0 ? "archive-event-card-featured" : ""}`}
                        key={event.id}
                        initial={reduce ? false : { opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <button
                          className="archive-event-cover"
                          type="button"
                          onClick={() => { setActiveEvent(event); setActiveImage(0); }}
                          aria-label={`Otwórz galerię: ${event.title}`}
                        >
                          <span className="archive-main-photo">
                            <img src={event.images[0].src} alt={event.images[0].alt} width={event.images[0].width} height={event.images[0].height} loading="lazy" />
                          </span>
                          <span className="archive-preview-stack" aria-hidden="true">
                            {event.images.slice(1, 3).map((image) => (
                              <img key={image.src} src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
                            ))}
                          </span>
                          <span className="archive-photo-count"><Camera size={17} /> {event.images.length}</span>
                        </button>
                        <div className="archive-event-info">
                          <div className="archive-event-meta">
                            <span>{formatDate(event.date)}</span>
                            <span><MapPin size={15} /> {event.location}</span>
                          </div>
                          <h3>{event.title}</h3>
                          <p>{event.description}</p>
                          <button className="text-link" type="button" onClick={() => { setActiveEvent(event); setActiveImage(0); }}>
                            Otwórz galerię <ArrowRight size={18} />
                          </button>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="chronicle-return section-shell">
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
