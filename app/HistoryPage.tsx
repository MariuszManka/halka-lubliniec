"use client";

import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { timeline } from "../content/site-content";
import { ensembleGroups, mainNavigation } from "../content/site-config";
import { SiteHeader } from "./SiteHeader";
import { ScrollRosettes } from "./FolkRosette";

export function HistoryPage() {
  const yearsOfHistory = new Date().getFullYear() - 1948;

  return (
    <main className="history-page">
      <a className="history-skip-link" href="#history-content">Przejdź do historii</a>
      <ScrollRosettes />

      <SiteHeader activeHref="/historia" />

      <section className="history-hero history-shell" id="history-content" aria-labelledby="history-title">
        <div className="history-hero-copy">
          <p className="history-eyebrow">Historia Zespołu Halka</p>
          <h1 id="history-title">Od 1948 roku <em>tańczymy razem.</em></h1>
          <p className="history-hero-lead">
            Zmieniały się pokolenia, sceny i repertuar. Niezmienna została potrzeba wspólnego śpiewu,
            ruchu i przekazywania tradycji dalej.
          </p>
          <a className="history-primary-link" href="#os-czasu">Przejdź do osi czasu <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
        </div>

        <figure className="history-hero-visual">
          <picture>
            <source media="(max-width: 820px)" srcSet="/home-responsive/group-960.webp" />
            <img
              src="/session/group.webp"
              alt="Współczesny skład Zespołu Pieśni i Tańca Halka"
              width="2200"
              height="1467"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption><span>Halka dzisiaj</span><strong>Pieśń. Taniec. Pokolenia.</strong></figcaption>
          <span className="history-hero-year" aria-hidden="true">1948</span>
        </figure>
      </section>

      <section className="history-opening history-shell" aria-labelledby="opening-title">
        <div className="history-opening-label"><span>01</span><p>Początek opowieści</p></div>
        <div className="history-opening-copy">
          <h2 id="opening-title">Zaczęło się od ludzi, którzy chcieli śpiewać.</h2>
          <p>
            W 1948 roku Józef Kościelny i grono przyjaciół powołali zespół, aby ożywić życie śpiewacze
            Lublińca i pielęgnować regionalne tradycje. Od tamtej pory Halka pozostaje wspólnotą,
            w której doświadczenie jednego pokolenia staje się początkiem następnego.
          </p>
          <dl className="history-facts" aria-label="Halka w liczbach">
            <div><dt>1948</dt><dd>rok założenia</dd></div>
            <div><dt>4</dt><dd>działające grupy</dd></div>
            <div><dt>{yearsOfHistory}</dt><dd>lat wspólnej historii</dd></div>
          </dl>
        </div>
      </section>

      <section className="history-timeline-section" id="os-czasu" aria-labelledby="timeline-title">
        <div className="history-shell">
          <header className="history-timeline-heading">
            <div><p>02 · Najważniejsze momenty</p><h2 id="timeline-title">Historia w sześciu krokach.</h2></div>
            <p>To początek kroniki. Będziemy ją rozwijać wraz z kolejnymi potwierdzonymi materiałami i archiwalnymi fotografiami.</p>
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
            Historia opracowana na podstawie materiałów zespołu oraz Miejskiego Domu Kultury w Lublińcu.
          </p>
        </div>
      </section>

      <section className="history-generations history-shell" aria-labelledby="generations-title">
        <div className="history-generations-visual" aria-label="Halka — kolejne pokolenia">
          <figure className="history-generations-main">
            <img src="/session/dance-circle.webp" srcSet="/home-responsive/dance-circle-960.webp 960w, /home-responsive/dance-circle-1600.webp 1600w" sizes="(max-width: 900px) calc(100vw - 32px), 56vw" alt="Tancerze Halki podczas wspólnego układu" loading="lazy" decoding="async" />
          </figure>
          <figure className="history-generations-small">
            <img src="/session/children-group.webp" srcSet="/home-responsive/children-group-960.webp 960w" sizes="(max-width: 520px) 48vw, 280px" alt="Najmłodsi członkowie Zespołu Halka" loading="lazy" decoding="async" />
            <figcaption>Następne pokolenie</figcaption>
          </figure>
        </div>

        <div className="history-generations-copy">
          <p>03 · Historia trwa</p>
          <h2 id="generations-title">Tradycja żyje tylko wtedy, gdy jest przekazywana dalej.</h2>
          <p>
            Dziś Halkę tworzą dzieci, młodzież i dorośli. Każda grupa pracuje we własnym rytmie,
            ale wszystkie spotykają się w jednej opowieści i na jednej scenie.
          </p>
          <ul aria-label="Działające grupy zespołu">
            {ensembleGroups.map((group, index) => (
              <li key={group.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{group.name}</strong><small>{group.age}</small></li>
            ))}
          </ul>
          <Link className="history-text-link" href="/dolacz">Poznaj grupy i dołącz <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="history-next" aria-labelledby="history-next-title">
        <div className="history-shell">
          <div><p>Opowieść trwa</p><h2 id="history-next-title">Zobacz Halkę na scenie.</h2></div>
          <div className="history-next-actions">
            <Link className="history-next-primary" href="/wydarzenia"><CalendarBlank size={19} aria-hidden="true" /> Najbliższe wydarzenia</Link>
            <Link href="/galeria">Przejdź do galerii <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <footer className="history-footer history-shell">
        <Link className="home-v2-footer-brand" href="/"><img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="58" height="58" /><span><strong>HALKA</strong><small>Od 1948 roku tańczymy razem.</small></span></Link>
        <nav aria-label="Nawigacja w stopce">{mainNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
        <p>© {new Date().getFullYear()} ZPiT Halka</p>
      </footer>
    </main>
  );
}
