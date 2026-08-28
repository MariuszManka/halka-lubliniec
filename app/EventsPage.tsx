"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Clock,
  List,
  MapPin,
  X,
} from "@phosphor-icons/react";
import { calendarEvents, eventGroups, type CalendarEvent } from "../content/events";
import { ensembleGroups, mainNavigation, siteConfig } from "../content/site-config";
import { ScrollRosettes } from "./HeroVariants";

const monthNames = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];
const weekdayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"];

const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });
const shortDateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });

const formatDate = (event: CalendarEvent) => {
  const start = dateFormatter.format(new Date(`${event.date}T12:00:00`));
  if (!event.endDate) return start;
  return `${shortDateFormatter.format(new Date(`${event.date}T12:00:00`))} - ${dateFormatter.format(new Date(`${event.endDate}T12:00:00`))}`;
};

const formatTime = (event: CalendarEvent) => {
  if (!event.time) return "Godzina zostanie podana";
  return event.endTime ? `${event.time} - ${event.endTime}` : event.time;
};

const monthKey = (event: CalendarEvent) => event.date.slice(0, 7);

export function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);

  const publicEvents = useMemo(
    () => calendarEvents.filter((event) => event.kind !== "Próba"),
    [],
  );
  const upcoming = publicEvents.filter((event) => (event.endDate ?? event.date) >= today);
  const past = publicEvents.filter((event) => (event.endDate ?? event.date) < today && event.date.startsWith(today.slice(0, 4))).reverse();
  const months = [...new Set(calendarEvents.map(monthKey))].sort();
  const defaultMonth = months.find((month) => month >= currentMonth) ?? months.at(-1) ?? currentMonth;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

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

  const [year, month] = selectedMonth.split("-").map(Number);
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const selectedEvents = calendarEvents.filter((event) => monthKey(event) === selectedMonth);
  const selectedPublicEvents = selectedEvents.filter((event) => event.kind !== "Próba");
  const selectedPracticeCount = selectedEvents.length - selectedPublicEvents.length;
  const nextEvent = upcoming[0];

  const pastByMonth = past.reduce<Record<string, CalendarEvent[]>>((groups, event) => {
    const key = monthKey(event);
    (groups[key] ??= []).push(event);
    return groups;
  }, {});

  return (
    <main className="events-page">
      <ScrollRosettes />

      <header className="home-v2-header" ref={headerRef}>
        <Link className="home-v2-brand" href="/" aria-label="Halka, strona główna">
          <img src="/logo.jpg" alt="" width="46" height="46" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </Link>
        <nav className="home-v2-nav" aria-label="Główna nawigacja">
          {mainNavigation.map((item) => <Link aria-current={item.href === "/wydarzenia" ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="home-v2-contact" href="/#kontakt">Kontakt</Link>
        <button
          className="home-v2-menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="events-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        {menuOpen && (
          <nav className="home-v2-mobile-nav" id="events-mobile-menu" aria-label="Menu mobilne">
            {mainNavigation.map((item) => <Link aria-current={item.href === "/wydarzenia" ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/#kontakt">Kontakt</Link>
          </nav>
        )}
      </header>

      <section className="events-hero events-shell" aria-labelledby="events-title">
        <div className="events-hero-copy">
          <p className="events-eyebrow"><span>Wydarzenia i próby</span><i aria-hidden="true" /></p>
          <h1 id="events-title">Spotkajmy się <em>pod sceną.</em></h1>
          <p className="events-hero-lead">Sprawdź, gdzie występujemy i kiedy spotykamy się na regularnych próbach w Lublińcu.</p>
          <div className="events-hero-actions">
            <a className="events-button events-button-primary" href="#kalendarz">Zobacz kalendarz <ArrowRight size={18} weight="bold" /></a>
            <a className="events-button events-button-light" href="#proby">Terminy prób</a>
          </div>
        </div>

        <div className="events-hero-visual">
          <figure className="events-hero-photo">
            <img
              src="/gallery/tydzien-kultury-beskidzkiej-2026/01.webp"
              alt="Tancerze Halki podczas Tygodnia Kultury Beskidzkiej"
              width="1400"
              height="933"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          {nextEvent ? (
            <div className="events-next-card">
              <span>Najbliższy występ</span>
              <strong>{nextEvent.title}</strong>
              <p><CalendarBlank size={17} /> {formatDate(nextEvent)}</p>
              <p><MapPin size={17} /> {nextEvent.location}</p>
            </div>
          ) : (
            <div className="events-next-card events-next-card-empty">
              <span>Kolejne występy</span>
              <strong>Nowe terminy wkrótce</strong>
              <p>Opublikujemy je po potwierdzeniu.</p>
            </div>
          )}
        </div>
      </section>

      <section className="events-upcoming events-shell" aria-labelledby="upcoming-title">
        <div className="events-section-heading">
          <p>Najbliższe występy</p>
          <h2 id="upcoming-title">Gdzie nas zobaczysz.</h2>
        </div>

        {upcoming.length ? (
          <div className="events-upcoming-list">
            {upcoming.map((event, index) => {
              const date = new Date(`${event.date}T12:00:00`);
              return (
                <article className={index === 0 ? "events-upcoming-row events-upcoming-row-featured" : "events-upcoming-row"} key={event.id}>
                  <time dateTime={event.date}>
                    <strong>{String(date.getDate()).padStart(2, "0")}</strong>
                    <span>{monthNames[date.getMonth()].slice(0, 3)} {date.getFullYear()}</span>
                  </time>
                  <div className="events-upcoming-main">
                    <span>{event.kind}</span>
                    <h3>{event.title}</h3>
                    {event.note && <p>{event.note}</p>}
                  </div>
                  <div className="events-upcoming-place">
                    <span><Clock size={17} /> {formatTime(event)}</span>
                    <span><MapPin size={17} /> {event.location}</span>
                  </div>
                  <div className="events-group-list" aria-label="Występujące grupy">
                    {event.groups.map((group) => <span key={group}>{eventGroups[group].label}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="events-empty-state">
            <CalendarBlank size={30} weight="duotone" />
            <div><h3>Czekamy na potwierdzenie terminów.</h3><p>Nowe występy pojawią się tutaj, gdy tylko zostaną ustalone.</p></div>
          </div>
        )}
      </section>

      <section className="events-calendar-section" id="kalendarz" aria-labelledby="calendar-title">
        <div className="events-shell">
          <div className="events-calendar-heading">
            <p>Pełny terminarz</p>
            <h2 id="calendar-title">Kalendarz Halki.</h2>
            <span>Występy, warsztaty i regularne próby w jednym miejscu.</span>
          </div>

          <div className="events-month-tabs" role="group" aria-label="Wybierz miesiąc">
            {months.map((key) => {
              const [tabYear, tabMonth] = key.split("-").map(Number);
              return (
                <button type="button" aria-pressed={selectedMonth === key} onClick={() => setSelectedMonth(key)} key={key}>
                  <span>{monthNames[tabMonth - 1]}</span><small>{tabYear}</small>
                </button>
              );
            })}
          </div>

          <div className="events-calendar-layout">
            <div className="events-calendar" role="grid" aria-label={`${monthNames[month - 1]} ${year}`}>
              <div className="events-calendar-weekdays" role="row">
                {weekdayNames.map((day) => <span role="columnheader" key={day}>{day}</span>)}
              </div>
              <div className="events-calendar-days">
                {Array.from({ length: firstWeekday }).map((_, index) => <span className="events-calendar-blank" aria-hidden="true" key={`blank-${index}`} />)}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = `${selectedMonth}-${String(day).padStart(2, "0")}`;
                  const dayEvents = selectedEvents.filter((event) => event.date === date);
                  return (
                    <div className={dayEvents.length ? "events-calendar-day has-events" : "events-calendar-day"} role="gridcell" key={date}>
                      <time dateTime={date}>{day}</time>
                      <div>
                        {dayEvents.slice(0, 2).map((event) => <span className={`events-calendar-entry events-calendar-entry-${event.kind.toLowerCase()}`} title={`${event.title}, ${formatTime(event)}`} key={event.id}>{event.time ?? ""} {event.title}</span>)}
                        {dayEvents.length > 2 && <small>+{dayEvents.length - 2}</small>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="events-month-agenda" aria-label={`Wydarzenia w miesiącu: ${monthNames[month - 1]}`}>
              <div className="events-month-agenda-heading"><span>{monthNames[month - 1]}</span><strong>{selectedPublicEvents.length} {selectedPublicEvents.length === 1 ? "wydarzenie" : "wydarzeń"}</strong></div>
              {selectedPublicEvents.length ? selectedPublicEvents.map((event) => (
                <article key={event.id}>
                  <time dateTime={event.date}>{shortDateFormatter.format(new Date(`${event.date}T12:00:00`))}</time>
                  <div><span>{event.kind}</span><h3>{event.title}</h3><p>{formatTime(event)}, {event.location}</p></div>
                </article>
              )) : <p className="events-agenda-empty">W tym miesiącu nie ma jeszcze opublikowanych wydarzeń.</p>}
              {selectedPracticeCount > 0 && <p className="events-agenda-note">Regularne próby ({selectedPracticeCount}) są zaznaczone w kalendarzu. Ich stałe godziny znajdziesz poniżej.</p>}
            </aside>
          </div>
        </div>
      </section>

      <section className="events-practices events-shell" id="proby" aria-labelledby="practices-title">
        <div className="events-practices-intro">
          <p>Stały plan</p>
          <h2 id="practices-title">Próby w Lublińcu.</h2>
          <span>Wszystkie grupy spotykają się w siedzibie zespołu przy ul. Stalmacha 12.</span>
          <a href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> Pokaż siedzibę na mapie <ArrowUpRight size={16} /></a>
        </div>
        <div className="events-practice-grid">
          {ensembleGroups.map((group) => (
            <article key={group.id}>
              <span>{group.age}</span>
              <h3>{group.name}</h3>
              <p>{group.activity}</p>
              <strong><CalendarBlank size={19} /> {group.schedule}</strong>
              <Link href={`/dolacz#${group.id}`}>Informacje o grupie <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      {Object.keys(pastByMonth).length > 0 && (
        <section className="events-past events-shell" aria-labelledby="past-title">
          <div className="events-past-heading">
            <p>Minione w {today.slice(0, 4)} roku</p>
            <h2 id="past-title">Zapisane w kalendarzu.</h2>
          </div>
          <div className="events-past-groups">
            {Object.entries(pastByMonth).map(([key, items]) => {
              const [, monthNumber] = key.split("-").map(Number);
              return (
                <section aria-labelledby={`past-${key}`} key={key}>
                  <h3 id={`past-${key}`}>{monthNames[monthNumber - 1]}</h3>
                  <div>
                    {items.map((event) => (
                      <article key={event.id}>
                        <time dateTime={event.date}>{String(new Date(`${event.date}T12:00:00`).getDate()).padStart(2, "0")}</time>
                        <div><strong>{event.title}</strong><span>{event.location}</span></div>
                        <span>{event.kind}</span>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <Link className="events-gallery-link" href="/galeria">Zobacz zdjęcia z wydarzeń <ArrowRight size={18} /></Link>
        </section>
      )}

      <section className="events-cta" aria-labelledby="events-cta-title">
        <div className="events-shell">
          <div><p>Organizujesz wydarzenie?</p><h2 id="events-cta-title">Halka może wystąpić także u Ciebie.</h2></div>
          <Link className="events-button events-button-on-green" href="/zapros-halke">Poznaj ofertę <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="events-footer events-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="58" height="58" /><span><strong>HALKA</strong><small>Od 1948 roku tańczymy razem.</small></span></Link>
        <nav aria-label="Nawigacja w stopce">{mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} ZPiT Halka</p>
      </footer>
    </main>
  );
}
