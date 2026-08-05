"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Camera,
  EnvelopeSimple,
  List,
  MapPin,
  Phone,
  X,
} from "@phosphor-icons/react";
import { galleryEvents } from "../content/generated-gallery";
import { sessionImages } from "../content/generated-session";
import { contact, facts, schedule, timeline } from "../content/site-content";

type GalleryEvent = (typeof galleryEvents)[number];

const navItems = [
  ["Kronika", "#kronika"],
  ["Historia", "#historia"],
  ["Terminarz", "#terminarz"],
  ["Kontakt", "#kontakt"],
] as const;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));

function SessionImage({
  name,
  className = "",
  loading = "lazy",
}: {
  name: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const image = sessionImages.find((item) => item.name === name);
  if (!image) return null;
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "auto"}
    />
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FolkRosette({ className = "" }: { className?: string }) {
  return (
    <span className={`folk-rosette ${className}`}>
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ "--petal": index } as React.CSSProperties} />
      ))}
      <b />
    </span>
  );
}

function FolkSprig({ side }: { side: "left" | "right" }) {
  return (
    <div className={`folk-sprig folk-sprig-${side}`}>
      <span className="folk-thread" />
      <span className="folk-leaf folk-leaf-one" />
      <span className="folk-leaf folk-leaf-two" />
      <span className="folk-leaf folk-leaf-three" />
      <FolkRosette className="folk-sprig-flower" />
    </div>
  );
}

function FolkScrollBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [-150, 170]);
  const driftReverse = useTransform(scrollYProgress, [0, 1], [130, -190]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 145]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [80, -105]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.82, 1.08, 0.9]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [120, -150]);

  return (
    <div className="folk-backdrop" aria-hidden="true">
      <motion.div className="folk-backdrop-field" style={reduce ? undefined : { y: fieldY }}>
        {Array.from({ length: 35 }, (_, index) => <span key={index} />)}
      </motion.div>
      <motion.div
        className="folk-backdrop-rosette folk-backdrop-rosette-one"
        style={reduce ? undefined : { y: drift, rotate, scale }}
      >
        <FolkRosette />
      </motion.div>
      <motion.div
        className="folk-backdrop-rosette folk-backdrop-rosette-two"
        style={reduce ? undefined : { y: driftReverse, rotate: rotateReverse }}
      >
        <FolkRosette />
      </motion.div>
      <motion.div className="folk-backdrop-vine folk-backdrop-vine-left" style={reduce ? undefined : { y: driftReverse }}>
        <div><FolkSprig side="left" /></div>
      </motion.div>
      <motion.div className="folk-backdrop-vine folk-backdrop-vine-right" style={reduce ? undefined : { y: drift }}>
        <div><FolkSprig side="right" /></div>
      </motion.div>
    </div>
  );
}

export function HalkaSite() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState<"all" | number>("all");
  const [activeEvent, setActiveEvent] = useState<GalleryEvent | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mailPrepared, setMailPrepared] = useState(false);

  const years = useMemo(
    () => [...new Set(galleryEvents.map((event) => event.year))].sort((a, b) => b - a),
    [],
  );
  const visibleEvents = year === "all" ? galleryEvents : galleryEvents.filter((event) => event.year === year);

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

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get("subject") || "Wiadomość ze strony Halki"));
    const body = encodeURIComponent(
      `Imię i nazwisko: ${String(form.get("name") || "")}\nE-mail: ${String(form.get("email") || "")}\n\n${String(form.get("message") || "")}`,
    );
    setMailPrepared(true);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <FolkScrollBackdrop />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Halka, przejdź na początek strony">
          <img src="/logo.jpg" alt="" width="48" height="48" />
          <span>
            <strong>HALKA</strong>
            <small>Lubliniec</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#kontakt">Dołącz do nas</a>
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
              <a href="#kontakt" onClick={() => setMenuOpen(false)}>Dołącz do nas</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="hero section-shell" id="top">
        <motion.div
          className="hero-copy"
          initial={reduce ? false : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Zespół Pieśni i Tańca z Lublińca</p>
          <h1>Tu tradycja <em>żyje.</em></h1>
          <p className="hero-lead">Od 1948 roku śpiewamy, tańczymy i opowiadamy Śląsk kolejnym pokoleniom.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#historia">Poznaj nas <ArrowUpRight size={18} /></a>
            <a className="text-link" href="#kronika">Otwórz kronikę <ArrowRight size={18} /></a>
          </div>
        </motion.div>

        <motion.figure
          className="hero-visual"
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-photo-ring"
            animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <SessionImage name="dance-circle" loading="eager" />
          </motion.div>
          <figcaption>
            <span>Pokolenia w jednym rytmie</span>
            <strong>od 1948</strong>
          </figcaption>
        </motion.figure>
      </section>

      <section className="facts section-shell" aria-label="Dorobek zespołu">
        {facts.map((fact, index) => (
          <Reveal key={fact.label} className="fact" delay={index * 0.06}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </Reveal>
        ))}
      </section>

      <section className="together section-shell" aria-labelledby="together-title">
        <div className="together-grid">
          <Reveal className="together-group-photo">
            <SessionImage name="group" />
          </Reveal>
          <Reveal className="together-copy" delay={0.08}>
            <p className="section-kicker">Jedna Halka. Wiele pokoleń.</p>
            <h2 id="together-title">Nie odtwarzamy tradycji. My nią żyjemy.</h2>
            <p>
              Jesteśmy amatorami, tancerzami, śpiewakami i muzykami. Łączy nas ruch,
              wspólnota i radość przekazywania dalej tego, co otrzymaliśmy od poprzednich pokoleń.
            </p>
            <a className="text-link" href="#historia">Przeczytaj naszą historię <ArrowRight size={18} /></a>
          </Reveal>
          <Reveal className="together-detail" delay={0.12}>
            <SessionImage name="costume-detail" />
          </Reveal>
          <Reveal className="together-portrait" delay={0.18}>
            <SessionImage name="portrait-trio" />
          </Reveal>
        </div>
      </section>

      <section className="chronicle section-shell" id="kronika" aria-labelledby="chronicle-title">
        <Reveal className="section-heading chronicle-heading">
          <div>
            <p className="section-kicker">Kronika zespołu</p>
            <h2 id="chronicle-title">Każdy występ zostawia ślad.</h2>
          </div>
          <p>Koncerty, wyjazdy i spotkania zapisane w obrazach. Wybierz rok i zajrzyj do środka.</p>
        </Reveal>

        <div className="year-filter" aria-label="Filtruj kronikę według roku">
          <button type="button" className={year === "all" ? "active" : ""} aria-pressed={year === "all"} onClick={() => setYear("all")}>Wszystkie</button>
          {years.map((item) => (
            <button key={item} type="button" className={year === item ? "active" : ""} aria-pressed={year === item} onClick={() => setYear(item)}>{item}</button>
          ))}
        </div>

        <motion.div className="event-list" layout>
          <AnimatePresence mode="popLayout">
            {visibleEvents.map((event, eventIndex) => (
              <motion.article
                className="event-card"
                key={event.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.45, delay: eventIndex * 0.04 }}
              >
                <button
                  type="button"
                  className="event-gallery-button"
                  onClick={() => { setActiveEvent(event); setActiveImage(0); }}
                  aria-label={`Otwórz galerię: ${event.title}`}
                >
                  <span className="event-cover">
                    <img src={event.images[0].src} alt={event.images[0].alt} width={event.images[0].width} height={event.images[0].height} loading="lazy" />
                  </span>
                  <span className="event-side-images" aria-hidden="true">
                    {event.images.slice(1, 3).map((image) => (
                      <img key={image.src} src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
                    ))}
                  </span>
                </button>
                <div className="event-info">
                  <div>
                    <span>{formatDate(event.date)}</span>
                    <span>{event.location}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <button type="button" className="text-link" onClick={() => { setActiveEvent(event); setActiveImage(0); }}>
                    <Camera size={19} /> Zobacz {event.images.length} zdjęć
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {visibleEvents.length === 0 && <p className="empty-state">W tym roku nie ma jeszcze wpisów w kronice.</p>}
      </section>

      <section className="history section-shell" id="historia" aria-labelledby="history-title">
        <Reveal className="history-intro">
          <p className="section-kicker">Historia</p>
          <h2 id="history-title">Zaczęło się w mroźną niedzielę.</h2>
          <p>
            W 1948 roku grupa miłośników muzyki i pieśni spotkała się w małej kawiarence.
            Chcieli ożywić życie śpiewacze Lublińca i stale pielęgnować tradycje ludowe.
          </p>
        </Reveal>
        <div className="timeline">
          {timeline.map((item, index) => (
            <Reveal key={item.year} className="timeline-item" delay={index * 0.05}>
              <span className="timeline-year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="history-source">
          Historia opracowana na podstawie materiałów
          {" "}<a href={contact.mdkLink} target="_blank" rel="noreferrer">Miejskiego Domu Kultury w Lublińcu</a>.
        </p>
      </section>

      <section className="generations section-shell" aria-labelledby="generations-title">
        <Reveal className="generations-copy">
          <p className="section-kicker">Halka to ludzie</p>
          <h2 id="generations-title">Od pierwszego kroku do wspólnej sceny.</h2>
          <p>Najmłodsi uczą się rytmu, starsi niosą doświadczenie, a scena mieści wszystkich.</p>
        </Reveal>
        <div className="generations-gallery">
          <Reveal className="generation-image generation-image-large"><SessionImage name="children-group" /></Reveal>
          <Reveal className="generation-image"><SessionImage name="children-pair" /></Reveal>
          <Reveal className="generation-image"><SessionImage name="portrait-choir" /></Reveal>
          <Reveal className="generation-image generation-image-wide"><SessionImage name="dance-duo" /></Reveal>
        </div>
      </section>

      <section className="schedule-section section-shell" id="terminarz" aria-labelledby="schedule-title">
        <Reveal className="schedule-heading">
          <div className="calendar-icon"><CalendarBlank size={30} /></div>
          <div>
            <p className="section-kicker">Gdzie nas spotkać</p>
            <h2 id="schedule-title">Najpierw próba. Potem scena.</h2>
            <p>Aktualne terminy koncertów pojawią się tutaj. W międzyczasie możesz dołączyć do regularnych zajęć.</p>
          </div>
        </Reveal>
        <div className="schedule-list">
          {schedule.map((item, index) => (
            <Reveal className="schedule-row" key={`${item.day}-${item.time}-${item.title}`} delay={index * 0.07}>
              <span className="schedule-day">{item.day}</span>
              <strong>{item.time}</strong>
              <div><h3>{item.title}</h3><p>{item.meta}</p></div>
              <MapPin size={22} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
        <a className="button button-secondary" href="#kontakt">Zapytaj o najbliższy występ <ArrowUpRight size={18} /></a>
      </section>

      <section className="contact section-shell" id="kontakt" aria-labelledby="contact-title">
        <Reveal className="contact-heading">
          <p className="section-kicker">Kontakt</p>
          <h2 id="contact-title">Zatańczmy coś razem.</h2>
          <p>Koncert, współpraca, nabór do zespołu? Napisz lub odwiedź nas w Lublińcu.</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleContact}>
              <div className="form-row">
                <label>Imię i nazwisko<input name="name" autoComplete="name" required /></label>
                <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label>Temat<input name="subject" required /></label>
              <label>Wiadomość<textarea name="message" rows={5} required /></label>
              <label className="consent"><input type="checkbox" required /> <span>Zgadzam się na kontakt w sprawie przesłanej wiadomości.</span></label>
              <button className="button button-primary" type="submit">Przygotuj wiadomość <EnvelopeSimple size={19} /></button>
              <p className="form-helper" aria-live="polite">
                {mailPrepared ? "Wiadomość została przygotowana w Twoim programie pocztowym." : "Formularz otworzy Twój program pocztowy. Nie zapisujemy danych na stronie."}
              </p>
            </form>
          </Reveal>
          <Reveal className="contact-place" delay={0.1}>
            <iframe
              title="Mapa siedziby Zespołu Pieśni i Tańca Halka"
              src="https://www.google.com/maps?q=Stalmacha+12,+42-700+Lubliniec&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-details">
              <a href={contact.mapLink} target="_blank" rel="noreferrer"><MapPin size={22} /><span>{contact.address}</span></a>
              <a href={`tel:${contact.phone}`}><Phone size={22} /><span>{contact.phoneDisplay}</span></a>
              <a href={`mailto:${contact.email}`}><EnvelopeSimple size={22} /><span>{contact.email}</span></a>
            </div>
          </Reveal>
        </div>
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
          <motion.div
            className="lightbox-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeGallery}
          >
            <motion.section
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="lightbox-topbar">
                <div><span>{activeEvent.location}</span><h2 id="lightbox-title">{activeEvent.title}</h2></div>
                <button type="button" aria-label="Zamknij galerię" onClick={closeGallery}><X size={26} /></button>
              </div>
              <div className="lightbox-stage">
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
              <div className="lightbox-bottom">
                <span>{activeImage + 1} / {activeEvent.images.length}</span>
                <span>Fot. {activeEvent.credit}</span>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
