"use client";

import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import type { HistoryPageCmsContent, SharedContent } from "../sanity/content";
import { SiteHeader } from "./SiteHeader";
import { ScrollRosettes } from "./FolkRosette";

export function HistoryPage({ content, shared }: { content: HistoryPageCmsContent; shared: SharedContent }) {
  const { copy, timeline } = content;
  const yearsOfHistory = new Date().getFullYear() - 1948;

  return (
    <main className="history-page">
      <a className="history-skip-link" href="#history-content">{copy["skipLabel"]}</a>
      <ScrollRosettes />

      <SiteHeader activeHref="/historia" shared={shared} />

      <section className="history-hero history-shell" id="history-content" aria-labelledby="history-title">
        <div className="history-hero-copy">
          <p className="history-eyebrow">{copy["hero.eyebrow"]}</p>
          <h1 id="history-title">{copy["hero.title"]} <em>{copy["hero.titleAccent"]}</em></h1>
          <p className="history-hero-lead">{copy["hero.lead"]}</p>
          <a className="history-primary-link" href="#os-czasu">{copy["hero.cta"]} <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
        </div>

        <figure className="history-hero-visual">
          <picture>
            <source media="(max-width: 820px)" srcSet="/home-responsive/group-960.webp" />
            <img
              src="/session/group.webp"
              alt={copy["hero.imageAlt"]}
              width="2200"
              height="1467"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption><span>{copy["hero.imageLabel"]}</span><strong>{copy["hero.imageCaption"]}</strong></figcaption>
          <span className="history-hero-year" aria-hidden="true">1948</span>
        </figure>
      </section>

      <section className="history-opening history-shell" aria-labelledby="opening-title">
        <div className="history-opening-label"><span>01</span><p>{copy["opening.eyebrow"]}</p></div>
        <div className="history-opening-copy">
          <h2 id="opening-title">{copy["opening.title"]}</h2>
          <p>{copy["opening.text"]}</p>
          <dl className="history-facts" aria-label={copy["opening.factsLabel"]}>
            <div><dt>1948</dt><dd>{copy["opening.fact1Label"]}</dd></div>
            <div><dt>{shared.ensembleGroups.length}</dt><dd>{copy["opening.fact2Label"]}</dd></div>
            <div><dt>{yearsOfHistory}</dt><dd>{copy["opening.fact3Label"]}</dd></div>
          </dl>
        </div>
      </section>

      <section className="history-timeline-section" id="os-czasu" aria-labelledby="timeline-title">
        <div className="history-shell">
          <header className="history-timeline-heading">
            <div><p>{copy["timeline.eyebrow"]}</p><h2 id="timeline-title">{copy["timeline.title"]}</h2></div>
            <p>{copy["timeline.lead"]}</p>
          </header>

          <ol className="history-timeline">
            {timeline.map((item, index) => (
              <li key={item.year} className={item.year === "Dziś" ? "history-timeline-item history-timeline-item-current" : "history-timeline-item"}>
                <span className="history-timeline-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <time>{item.year}</time>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>

          <p className="history-source">
            {copy["timeline.source"]}
          </p>
        </div>
      </section>

      <section className="history-generations history-shell" aria-labelledby="generations-title">
        <div className="history-generations-visual" aria-label={copy["generations.visualLabel"]}>
          <figure className="history-generations-main">
            <img src="/session/dance-circle.webp" srcSet="/home-responsive/dance-circle-960.webp 960w, /home-responsive/dance-circle-1600.webp 1600w" sizes="(max-width: 900px) calc(100vw - 32px), 56vw" alt={copy["generations.mainAlt"]} loading="lazy" decoding="async" />
          </figure>
          <figure className="history-generations-small">
            <img src="/session/children-group.webp" srcSet="/home-responsive/children-group-960.webp 960w" sizes="(max-width: 520px) 48vw, 280px" alt={copy["generations.smallAlt"]} loading="lazy" decoding="async" />
            <figcaption>{copy["generations.smallCaption"]}</figcaption>
          </figure>
        </div>

        <div className="history-generations-copy">
          <p>{copy["generations.eyebrow"]}</p>
          <h2 id="generations-title">{copy["generations.title"]}</h2>
          <p>{copy["generations.text"]}</p>
          <ul aria-label={copy["generations.groupsLabel"]}>
            {shared.ensembleGroups.map((group, index) => (
              <li key={group.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{group.name}</strong><small>{group.age}</small></li>
            ))}
          </ul>
          <Link className="history-text-link" href="/dolacz">{copy["generations.cta"]} <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="history-next" aria-labelledby="history-next-title">
        <div className="history-shell">
          <div><p>{copy["next.eyebrow"]}</p><h2 id="history-next-title">{copy["next.title"]}</h2></div>
          <div className="history-next-actions">
            <Link className="history-next-primary" href="/wydarzenia"><CalendarBlank size={19} aria-hidden="true" /> {copy["next.eventsCta"]}</Link>
            <Link href="/galeria">{copy["next.galleryCta"]} <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <footer className="history-footer history-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt={shared.footer.logoAlt} width="58" height="58" /><span><strong>{shared.footer.brand}</strong><small>{shared.footer.tagline}</small></span></Link>
        <nav aria-label={shared.header.navigationLabel}>{shared.mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} {shared.footer.copyrightShort}</p>
      </footer>
    </main>
  );
}
