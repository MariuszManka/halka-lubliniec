"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";
import { calendarEvents } from "../content/events";
import { mainNavigation, siteConfig } from "../content/site-config";
import type { JoinPageContent } from "../sanity/content-types";
import { ScrollRosettes } from "./HeroVariants";
import { SiteHeader } from "./SiteHeader";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const responsiveImage = (src: string) => src.startsWith("/session/")
  ? src.replace("/session/", "/home-responsive/").replace(/\.webp$/, "-960.webp")
  : undefined;

const practiceMatchesGroup = (groupId: string, title: string, groups: readonly string[]) => {
  if (groupId === "grupa-1") return title === "Próba grupy 1";
  if (groupId === "grupa-2") return title === "Próba grupy 2";
  if (groupId === "chor") return groups.includes("choir");
  return groups.includes("ballet");
};

export function JoinPage({ content }: { content: JoinPageContent }) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="join-page">
      <ScrollRosettes />

      <SiteHeader activeHref="/dolacz" />

      {/* <section className="recruit-hero" aria-labelledby="join-title">
        <div className="recruit-copy">
          <p className="recruit-eyebrow"><span>{content.hero.eyebrow}</span><i aria-hidden="true" /></p>
          <h1 id="join-title">{content.hero.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)} <em>{content.hero.titleAccent}</em></h1>
          <span className="recruit-divider" aria-hidden="true"><i /><b /><i /></span>
          <p className="recruit-lead">{content.hero.lead}</p>
          <div className="recruit-actions">
            <a className="join-button join-button-primary" href="#grupy">{content.hero.primaryCtaLabel} <ArrowRight size={18} weight="bold" /></a>
            <a className="join-button join-button-light" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> {content.hero.secondaryCtaLabel}</a>
          </div>
        </div>

        <div className="recruit-visual" aria-label="Tancerki Zespołu Pieśni i Tańca Halka">
          <figure className="recruit-photo">
            <img
              src="/join/hero-dancers-landscape-1800.webp"
              srcSet="/join/hero-dancers-landscape-960.webp 960w, /join/hero-dancers-landscape-1800.webp 1800w"
              sizes="(max-width: 700px) 100vw, 50vw"
              alt={content.hero.image.alt}
              width={1800}
              height={2700}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <figcaption className="recruit-visual-note"><small>{content.hero.noteLabel}</small><strong>{content.hero.noteText.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</strong></figcaption>
        </div>
        <ul className="recruit-facts" aria-label="Najważniejsze informacje o naborze">
          {content.hero.facts.map((fact) => <li key={`${fact.value}-${fact.label}`}><strong>{fact.value}</strong><span>{fact.label}</span></li>)}
        </ul>
      </section> */}


          <section
            className="join-hero join-shell"
            aria-labelledby="join-title"
          >
            <div className="join-hero-copy">
              <p className="join-eyebrow">
                <span>{content.hero.eyebrow}</span>
                <i aria-hidden="true" />
              </p>

              <h1 id="join-title">
                {content.hero.title.split("\n").map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}{" "}
                <em>{content.hero.titleAccent}</em>
              </h1>

              <p className="join-hero-lead">
                {content.hero.lead}
              </p>

              <div className="join-hero-actions">
                <a
                  className="join-button join-button-primary"
                  href="#grupy"
                >
                  {content.hero.primaryCtaLabel}
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </a>

                <a
                  className="join-button join-button-light"
                  href={siteConfig.contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={18} aria-hidden="true" />
                  {content.hero.secondaryCtaLabel}
                </a>
              </div>
            </div>

            <div className="join-hero-visual">
              <figure className="join-hero-photo">
                <img
                  src="/join/dance-duo.webp"
                  srcSet="/join/dance-duo-768.webp 768w,/join/dance-duo.webp 1365w"
                  sizes="(max-width: 920px) calc(100vw - 28px), 58vw"
                  alt={content.hero.image.alt}
                  width={1365}
                  height={2048}
                  fetchPriority="high"
                  decoding="async"
                />
              </figure>

              <div className="join-hero-card">
                <span>{content.hero.noteLabel}</span>

                <strong>
                  {content.hero.noteText.split("\n").map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </strong>
              </div>
            </div>
          </section>





      <section className="join-groups join-shell" id="grupy" aria-labelledby="join-groups-title">
        <div className="join-section-heading join-section-heading-groups">
          <p>{content.groups.eyebrow}</p>
          <h2 id="join-groups-title">{content.groups.title} <em>{content.groups.titleAccent}</em></h2>
        </div>

        <div className="join-group-list">
          {content.groups.items.map((group, index) => {
            const nextPractices = calendarEvents
              .filter((event) => event.kind === "Próba" && event.date >= today && practiceMatchesGroup(group.id, event.title, event.groups))
              .slice(0, 2);

            return (
              <article className={`join-group-card ${index % 2 ? "join-group-card-reverse" : ""}`} id={group.id} key={group.id}>
                <figure className="join-group-image">
                  <img src={group.image.src} srcSet={responsiveImage(group.image.src) ? `${responsiveImage(group.image.src)} 960w` : undefined} sizes="(max-width: 760px) calc(100vw - 32px), 52vw" alt={group.image.alt} loading="lazy" decoding="async" />
                  <figcaption>{String(index + 1).padStart(2, "0")} / 04</figcaption>
                </figure>
                <div className="join-group-copy">
                  <p className="join-group-status"><i aria-hidden="true" /> {group.statusLabel}</p>
                  <h3>{group.name}</h3>
                  <p className="join-group-intro">{group.meta}</p>
                  <p>{group.description}</p>
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
          <p className="join-section-label">{content.firstVisit.eyebrow}</p>
          <h2 id="first-visit-title">{content.firstVisit.title}<br />{content.firstVisit.titleAccent}</h2>
          <p>{content.firstVisit.text}</p>
        </div>
        <div className="join-first-list">
          {content.firstVisit.benefits.map((benefit) => <div key={benefit.title}><CheckCircle size={24} weight="fill" /><span><strong>{benefit.title}</strong><small>{benefit.text}</small></span></div>)}
        </div>
      </section>

      <section className="join-location" aria-labelledby="join-location-title">
        <div className="join-location-copy join-shell">
          <div>
            <p className="join-section-label">{content.location.eyebrow}</p>
            <h2 id="join-location-title">{content.location.title}</h2>
            <p>{siteConfig.contact.address}</p>
          </div>
          <div className="join-location-actions">
            <a className="join-button join-button-on-green" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer">{content.location.mapCtaLabel} <ArrowRight size={18} /></a>
            <a href={`mailto:${siteConfig.contact.email}`}><EnvelopeSimple size={18} /> {content.location.emailCtaLabel}</a>
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
