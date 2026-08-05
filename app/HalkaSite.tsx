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
  MusicNotes,
  PersonArmsSpread,
  Phone,
  Smiley,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { galleryEvents } from "../content/generated-gallery";
import { sessionImages } from "../content/generated-session";
import { calendarEvents, eventGroups, type CalendarEvent, type EventGroup } from "../content/events";
import { contact, facts, schedule, timeline } from "../content/site-content";

type GalleryEvent = (typeof galleryEvents)[number];

const navItems = [
  ["Galeria", "/galeria"],
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

const monthNames = [
  "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
  "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień",
];
const weekdayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"];
const calendarMonths = [...new Set(calendarEvents.map((event) => event.date.slice(0, 7)))].sort();

const formatEventDate = (event: CalendarEvent) => {
  const start = new Date(`${event.date}T12:00:00`);
  if (!event.endDate) {
    return `${start.getDate()} ${monthNames[start.getMonth()]}`;
  }
  const end = new Date(`${event.endDate}T12:00:00`);
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}-${end.getDate()} ${monthNames[start.getMonth()]}`;
  }
  return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]}`;
};

const formatEventTime = (event: CalendarEvent) => {
  if (!event.time) return "Godzina do potwierdzenia";
  return event.endTime ? `${event.time}-${event.endTime}` : event.time;
};

const groupIcons = {
  ensemble: UsersThree,
  children: Smiley,
  choir: MusicNotes,
  ballet: PersonArmsSpread,
} as const;

function GroupIcon({ group, size = 17 }: { group: EventGroup; size?: number }) {
  const Icon = groupIcons[group];
  return (
    <span className={`group-icon ${eventGroups[group].className}`} aria-hidden="true">
      <Icon size={size} weight="duotone" />
    </span>
  );
}

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

function EventsCalendar() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const firstCurrentOrFuture = calendarMonths.findIndex((month) => month >= currentMonth);
  const initialMonth = firstCurrentOrFuture >= 0
    ? calendarMonths[firstCurrentOrFuture]
    : calendarMonths[calendarMonths.length - 1];
  const [activeMonth, setActiveMonth] = useState(initialMonth);
  const [eventPopover, setEventPopover] = useState<{
    event: CalendarEvent;
    left: number;
    top?: number;
    bottom?: number;
    pinned: boolean;
  } | null>(null);

  useEffect(() => {
    if (!eventPopover) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEventPopover(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [eventPopover]);

  useEffect(() => {
    if (!eventPopover?.pinned) return;
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-event-popover], [data-event-anchor]")) setEventPopover(null);
    };
    const closeOnMove = () => setEventPopover(null);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnMove);
    window.addEventListener("scroll", closeOnMove, true);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnMove);
      window.removeEventListener("scroll", closeOnMove, true);
    };
  }, [eventPopover?.pinned]);

  const showEventPopover = (
    event: CalendarEvent,
    anchor: HTMLButtonElement,
    pinned: boolean,
  ) => {
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(360, window.innerWidth - 24);
    const left = Math.min(
      window.innerWidth - width - 12,
      Math.max(12, rect.left + rect.width / 2 - width / 2),
    );
    const placeBelow = window.innerHeight - rect.bottom > 340 || rect.top < 340;
    setEventPopover({
      event,
      left,
      pinned,
      ...(placeBelow
        ? { top: rect.bottom + 10 }
        : { bottom: window.innerHeight - rect.top + 10 }),
    });
  };

  const { cells, agendaEvents, hasPractices, label } = useMemo(() => {
    const [year, month] = activeMonth.split("-").map(Number);
    const monthIndex = month - 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const dayCells = [
      ...Array.from({ length: leadingDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
    const monthStart = `${activeMonth}-01`;
    const monthEnd = `${activeMonth}-${String(daysInMonth).padStart(2, "0")}`;
    const visible = calendarEvents
      .filter((event) => event.date <= monthEnd && (event.endDate ?? event.date) >= monthStart)
      .sort((a, b) => `${a.date}-${a.time ?? "99:99"}`.localeCompare(`${b.date}-${b.time ?? "99:99"}`));

    return {
      cells: dayCells,
      agendaEvents: visible.filter((event) => event.kind !== "Próba"),
      hasPractices: visible.some((event) => event.kind === "Próba"),
      label: `${monthNames[monthIndex]} ${year}`,
    };
  }, [activeMonth]);

  return (
    <div className="events-calendar">
      <div className="calendar-toolbar">
        <div className="calendar-month-switch" aria-label="Wybierz miesiąc">
          {calendarMonths.map((month) => {
            const [year, monthNumber] = month.split("-").map(Number);
            return (
              <button
                type="button"
                key={month}
                className={activeMonth === month ? "active" : ""}
                aria-pressed={activeMonth === month}
                onClick={() => setActiveMonth(month)}
              >
                {monthNames[monthNumber - 1]} <span>{year}</span>
              </button>
            );
          })}
        </div>
        <div className="calendar-legend" aria-label="Legenda grup">
          {Object.entries(eventGroups).map(([key, group]) => (
            <span key={key}><GroupIcon group={key as EventGroup} size={16} />{group.label}</span>
          ))}
        </div>
      </div>

      <div className="calendar-panel">
        <div className="calendar-panel-title">
          <span>Plan występów i przygotowań</span>
          <strong>{label}</strong>
        </div>
        <div className="calendar-grid" role="grid" aria-label={`Kalendarz: ${label}`}>
          {weekdayNames.map((day) => <span className="calendar-weekday" key={day} role="columnheader">{day}</span>)}
          {cells.map((day, cellIndex) => {
            if (!day) return <span className="calendar-day calendar-day-empty" key={`empty-${cellIndex}`} aria-hidden="true" />;
            const date = `${activeMonth}-${String(day).padStart(2, "0")}`;
            const dayEvents = calendarEvents.filter(
              (event) => event.date <= date && (event.endDate ?? event.date) >= date,
            );
            return (
              <div className={`calendar-day ${dayEvents.length ? "has-events" : ""}`} key={date} role="gridcell">
                <span className="calendar-day-number">{day}</span>
                <div className="calendar-day-events">
                  {dayEvents.map((event) => {
                    const primaryGroup = eventGroups[event.groups[0]];
                    return (
                      <button
                        type="button"
                        className={`calendar-event ${primaryGroup.className}`}
                        data-event-anchor
                        onMouseEnter={(mouseEvent) => {
                          if (!eventPopover?.pinned) showEventPopover(event, mouseEvent.currentTarget, false);
                        }}
                        onMouseLeave={() => {
                          setEventPopover((current) => current?.pinned ? current : null);
                        }}
                        onFocus={(focusEvent) => {
                          if (!eventPopover?.pinned) showEventPopover(event, focusEvent.currentTarget, false);
                        }}
                        onBlur={() => {
                          setEventPopover((current) => current?.pinned ? current : null);
                        }}
                        onClick={(clickEvent) => {
                          if (eventPopover?.pinned && eventPopover.event.id === event.id) {
                            setEventPopover(null);
                          } else {
                            showEventPopover(event, clickEvent.currentTarget, true);
                          }
                        }}
                        aria-label={`Pokaż szczegóły wydarzenia: ${event.title}, ${event.location}`}
                        key={event.id}
                      >
                        <span className="calendar-event-time">{event.time ?? "Termin"}</span>
                        <strong>{event.kind === "Próba" ? event.title : event.location}</strong>
                        <span className="calendar-event-icons">
                          {event.groups.map((group) => <GroupIcon group={group} size={13} key={group} />)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-agenda" aria-label={`Agenda: ${label}`}>
        {hasPractices && (
          <div className="practice-summary">
            <div><span>Stały plan</span><strong>Próby w tym miesiącu</strong></div>
            <div className="practice-summary-items">
              {schedule.map((item) => (
                <span key={`${item.day}-${item.title}`}><b>{item.day}</b>{item.title}<small>{item.time}</small></span>
              ))}
            </div>
          </div>
        )}
        {agendaEvents.map((event) => (
          <article className="agenda-event" id={`event-${event.id}`} key={event.id}>
            <div className="agenda-date">
              <strong>{formatEventDate(event)}</strong>
              <span>{event.kind}</span>
            </div>
            <div className="agenda-main">
              <span className="agenda-time">{formatEventTime(event)}</span>
              <h3>{event.title}</h3>
              <p>
                <MapPin size={17} aria-hidden="true" />
                {event.locationUrl ? (
                  <a href={event.locationUrl} target="_blank" rel="noreferrer">{event.location}<ArrowUpRight size={14} /></a>
                ) : event.location}
              </p>
              {event.note && <small>{event.note}</small>}
            </div>
            <div className="agenda-groups">
              {event.groups.map((group) => (
                <span className={eventGroups[group].className} key={group}>
                  <GroupIcon group={group} size={15} />{eventGroups[group].label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {eventPopover && (
          <motion.aside
            className={`event-popover ${eventPopover.pinned ? "is-pinned" : "is-preview"}`}
            data-event-popover
            role={eventPopover.pinned ? "dialog" : "tooltip"}
            aria-labelledby="event-popover-title"
            style={{
              left: eventPopover.left,
              ...(eventPopover.top !== undefined
                ? { top: eventPopover.top }
                : { bottom: eventPopover.bottom }),
            }}
            initial={{ opacity: 0, y: 7, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {eventPopover.pinned && (
              <button
                className="event-popup-close"
                type="button"
                aria-label="Zamknij szczegóły wydarzenia"
                onClick={() => setEventPopover(null)}
              >
                <X size={18} />
              </button>
            )}
            <div className="event-popup-icons">
              {eventPopover.event.groups.map((group) => <GroupIcon group={group} size={21} key={group} />)}
            </div>
            <p className="event-popup-kind">{eventPopover.event.kind}</p>
            <h2 id="event-popover-title">{eventPopover.event.title}</h2>
            <p className="event-popup-description">
              {eventPopover.event.note ?? `Udział: ${eventPopover.event.groups.map((group) => eventGroups[group].label.toLowerCase()).join(" i ")}.`}
            </p>
            <dl className="event-popup-details">
              <div><dt>Data</dt><dd>{formatEventDate(eventPopover.event)} {eventPopover.event.date.slice(0, 4)}</dd></div>
              <div><dt>Godzina</dt><dd>{formatEventTime(eventPopover.event)}</dd></div>
              <div>
                <dt>Miejsce</dt>
                <dd>
                  {eventPopover.event.locationUrl ? (
                    <a href={eventPopover.event.locationUrl} target="_blank" rel="noreferrer">
                      {eventPopover.event.location}<ArrowUpRight size={14} />
                    </a>
                  ) : eventPopover.event.location}
                </dd>
              </div>
            </dl>
            <div className="event-popup-groups">
              {eventPopover.event.groups.map((group) => (
                  <span className={eventGroups[group].className} key={group}>
                    <GroupIcon group={group} size={16} />{eventGroups[group].label}
                  </span>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HalkaSite() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<GalleryEvent | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mailPrepared, setMailPrepared] = useState(false);

  const pinnedEvents = galleryEvents.filter((event) => event.pinned);
  const featuredEvents = (pinnedEvents.length ? pinnedEvents : galleryEvents).slice(0, 3);

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
            <a className="text-link" href="/galeria">Zobacz galerię <ArrowRight size={18} /></a>
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

      <section className="chronicle section-shell" id="galeria" aria-labelledby="chronicle-title">
        <Reveal className="section-heading chronicle-heading">
          <div>
            <p className="section-kicker">Wybrane kadry</p>
            <h2 id="chronicle-title">Ostatnio w obiektywie.</h2>
          </div>
          <p>Trzy wybrane galerie z koncertów, wyjazdów i spotkań. Więcej zdjęć znajdziesz na osobnej podstronie.</p>
        </Reveal>

        <motion.div className="event-list" layout>
          <AnimatePresence mode="popLayout">
            {featuredEvents.map((event, eventIndex) => (
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
                  <span className="event-photo-badge"><Camera size={17} /> {event.images.length} zdjęć</span>
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
        <Reveal className="gallery-passage">
          <div className="gallery-passage-image">
            <img
              src={featuredEvents[0].images[1]?.src ?? featuredEvents[0].images[0].src}
              alt={featuredEvents[0].images[1]?.alt ?? featuredEvents[0].images[0].alt}
              width={featuredEvents[0].images[1]?.width ?? featuredEvents[0].images[0].width}
              height={featuredEvents[0].images[1]?.height ?? featuredEvents[0].images[0].height}
              loading="lazy"
            />
            <span><Camera size={18} /> Pełna galeria</span>
          </div>
          <div className="gallery-passage-copy">
            <p className="section-kicker">Więcej niż trzy kadry</p>
            <h3>Zajrzyj do całej opowieści.</h3>
            <p>Wszystkie realizacje, koncerty i fotografie uporządkowane według lat — z miejscem na kolejne wspomnienia.</p>
            <a className="button button-primary" href="/galeria">
              Przejdź do galerii <ArrowRight size={19} />
            </a>
          </div>
        </Reveal>
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
            <h2 id="schedule-title">Spotkajmy się pod sceną.</h2>
            <p>Koncerty, dożynki, spotkania i przygotowania Halki. Wybierz miesiąc, aby zobaczyć dokładny plan.</p>
          </div>
        </Reveal>
        <EventsCalendar />
        <a className="button button-secondary schedule-contact" href="#kontakt">Zapytaj o wydarzenie <ArrowUpRight size={18} /></a>
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
                <h2 id="lightbox-title">{activeEvent.title}</h2>
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
