"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Clock,
  MapPin,
  Ticket,
} from "@phosphor-icons/react";
import type { CalendarEvent } from "../content/events";
import type { EventsPageCmsContent, SharedContent } from "../sanity/content";
import { PageHero } from "./PageHero";
import { SiteHeader } from "./SiteHeader";
import { ScrollRosettes } from "./FolkRosette";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });
const shortDateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });

const formatDate = (event: CalendarEvent) => {
  const start = dateFormatter.format(new Date(`${event.date}T12:00:00`));
  if (!event.endDate) return start;
  return `${shortDateFormatter.format(new Date(`${event.date}T12:00:00`))} - ${dateFormatter.format(new Date(`${event.endDate}T12:00:00`))}`;
};

const formatTime = (event: CalendarEvent, unknownLabel: string) => {
  if (!event.time) return unknownLabel;
  return event.endTime ? `${event.time} - ${event.endTime}` : event.time;
};

const monthKey = (event: CalendarEvent) => event.date.slice(0, 7);

export function EventsPage({ content, shared }: { content: EventsPageCmsContent; shared: SharedContent }) {
  const { copy, calendarEvents, eventGroups } = content;
  const monthNames = copy["calendar.months"].split("|");
  const weekdayNames = copy["calendar.weekdays"].split("|");
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
      <a className="events-skip-link" href="#events-content">{copy["skipLabel"]}</a>
      <ScrollRosettes />

      <SiteHeader activeHref="/wydarzenia" shared={shared} />

      <PageHero
        id="events-content"
        titleId="events-title"
        eyebrow={copy["hero.eyebrow"]}
        title={<><span>{copy["hero.title"]}</span><em>{copy["hero.titleAccent"]}</em></>}
        lead={copy["hero.lead"]}
        actions={
          <>
            <a href="#najblizsze">{copy["hero.primaryCta"]} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
            <a href="#proby">{copy["hero.secondaryCta"]}</a>
          </>
        }
        image={{
          src: "/gallery/tydzien-kultury-beskidzkiej-2026/01.webp",
          alt: copy["hero.imageAlt"],
          width: 1400,
          height: 933,
          position: "50% 42%",
        }}
        noteLabel="Najbliższe wydarzenie"
        // note={nextEvent ? (
        //   <>
        //     <p><Ticket size={16} weight="fill" aria-hidden="true" /> Najbliższy występ</p>
        //     <div>
        //       <strong>{nextEvent.title}</strong>
        //       <p><CalendarBlank size={18} aria-hidden="true" /> {formatDate(nextEvent)}</p>
        //       <p><MapPin size={18} aria-hidden="true" /> {nextEvent.location}</p>
        //     </div>
        //   </>
        // ) : (
        //   <>
        //     <p>Kolejne występy</p>
        //     <div>
        //       <strong>Nowe terminy wkrótce</strong>
        //       <p>Opublikujemy je po potwierdzeniu.</p>
        //     </div>
        //   </>
        // )}
      />

      {/* <nav className="events-section-nav events-shell" aria-label="Sekcje strony">
        <a href="#najblizsze"><span>01</span> Najbliższe</a>
        <a href="#kalendarz"><span>02</span> Terminarz</a>
        <a href="#proby"><span>03</span> Próby</a>
      </nav> */}

      <section className="events-upcoming events-shell" id="najblizsze" aria-labelledby="upcoming-title">
        <div className="events-section-heading">
          <p>{copy["upcoming.eyebrow"]}</p>
          <h2 id="upcoming-title">{copy["upcoming.title"]}</h2>
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
                    <span><Clock size={18} aria-hidden="true" /> {formatTime(event, copy["timeUnknown"])}</span>
                    <span><MapPin size={18} aria-hidden="true" /> {event.location}</span>
                  </div>
                  <div className="events-group-list" aria-label={copy["calendar.performingGroupsLabel"]}>
                    {event.groups.map((group) => <span key={group}>{eventGroups[group].label}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="events-empty-state">
            <CalendarBlank size={30} weight="duotone" aria-hidden="true" />
            <div><h3>{copy["upcoming.emptyTitle"]}</h3><p>{copy["upcoming.emptyText"]}</p></div>
          </div>
        )}
      </section>

      <section className="events-calendar-section" id="kalendarz" aria-labelledby="calendar-title">
        <div className="events-shell">
          <div className="events-calendar-heading">
            <p>{copy["calendar.eyebrow"]}</p>
            <h2 id="calendar-title">{copy["calendar.title"]}</h2>
            <span>{copy["calendar.lead"]}</span>
          </div>

          <div className="events-month-tabs" role="group" aria-label={copy["calendar.selectMonthLabel"]}>
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
                        {dayEvents.slice(0, 2).map((event) => <span className={`events-calendar-entry events-calendar-entry-${event.kind.toLowerCase()}`} title={`${event.title}, ${formatTime(event, copy["timeUnknown"])}`} key={event.id}>{event.time ?? ""} {event.title}</span>)}
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
                  <div><span>{event.kind}</span><h3>{event.title}</h3><p>{formatTime(event, copy["timeUnknown"])}, {event.location}</p></div>
                </article>
              )) : <p className="events-agenda-empty">{copy["calendar.empty"]}</p>}
              {selectedPracticeCount > 0 && <p className="events-agenda-note">{copy["calendar.practiceNote"].replace("{count}", String(selectedPracticeCount))}</p>}
            </aside>
          </div>
        </div>
      </section>

      {Object.keys(pastByMonth).length > 0 && (
        <section className='events-past-outer-wrapper' aria-labelledby="past-title">
          <div className="events-past events-shell" >
              <summary>
                <span><small>{copy["archive.label"].replace("{year}", today.slice(0, 4))}</small><strong id="past-title">{copy["archive.title"]}</strong></span>
                <span className="events-past-summary-action">{copy["archive.action"]} <ArrowRight size={18} aria-hidden="true" /></span>
              </summary>
          </div>
        </section>
      )}


      <section className="events-practices-outer-wrapper" id="proby" aria-labelledby="practices-title">
        <div className="events-practices events-shell">
          <div className="events-practices-intro">
            <p>{copy["practices.eyebrow"]}</p>
            <h2 id="practices-title">{copy["practices.title"]}</h2>
            <span>{copy["practices.lead"]}</span>
            <a href={shared.siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={18} aria-hidden="true" /> {copy["practices.mapCta"]} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="events-practice-grid">
            {shared.ensembleGroups.map((group) => (
              <article key={group.id}>
                <span>{group.age}</span>
                <h3>{group.name}</h3>
                <p>{group.activity}</p>
                <strong><CalendarBlank size={19} aria-hidden="true" /> {group.schedule}</strong>
                <Link href={`/dolacz#${group.id}`}>{copy["practices.groupCta"]} <ArrowRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="events-cta" aria-labelledby="events-cta-title">
        <div className="events-shell">
          <div><p>{copy["cta.eyebrow"]}</p><h2 id="events-cta-title">{copy["cta.title"]}</h2></div>
          <Link className="events-button events-button-on-green" href="/zapros-halke">{copy["cta.label"]} <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <footer className="events-footer events-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt={shared.footer.logoAlt} width="58" height="58" /><span><strong>{shared.footer.brand}</strong><small>{shared.footer.tagline}</small></span></Link>
        <nav aria-label={shared.header.navigationLabel}>{shared.mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} {shared.footer.copyrightShort}</p>
      </footer>
    </main>
  );
}
