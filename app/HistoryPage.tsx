"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import type { SharedContent } from "../sanity/content";
import { historyChapters, openingPhoto, type HistoryPhoto } from "../content/history";
import { SiteHeader } from "./SiteHeader";
import { ScrollRosettes } from "./FolkRosette";
import { SiteFooter } from "./SiteFooter";
import { HistoryMap } from "./HistoryMap";

export function HistoryPage({ shared }: { shared: SharedContent }) {
  const [activeChapter, setActiveChapter] = useState(historyChapters[0].id);
  const [selectedPhoto, setSelectedPhoto] = useState<HistoryPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const list = indexRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (list && current) {
      list.scrollTo({ left: list.scrollLeft + current.getBoundingClientRect().left - list.getBoundingClientRect().left - 8, behavior: "instant" });
    }
  }, [activeChapter]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveChapter(entry.target.id);
      }
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll(".history-chapter").forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  function renderPhoto(photo: HistoryPhoto, priority = false) {
    return (
      <figure className="history-photo" key={photo.src}>
        <button type="button" className="history-photo-button" onClick={() => setSelectedPhoto(photo)} aria-label={`Powiększ zdjęcie: ${photo.caption}`} aria-haspopup="dialog">
          <img src={photo.src} srcSet={`${photo.src.replace(".webp", "-800.webp")} 800w, ${photo.src} ${photo.width}w`} sizes="(max-width: 760px) calc(100vw - 40px), 1000px" width={photo.width} height={photo.height} alt={photo.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
          <span className="history-photo-zoom" aria-hidden="true"><MagnifyingGlassPlus size={19} /> <span>Powiększ</span></span>
        </button>
        <figcaption>{photo.caption}</figcaption>
      </figure>
    );
  }

  return (
    <div className="history-page" id="poczatek">
      <a className="history-skip-link" href="#history-content">Przejdź do historii</a>
      <ScrollRosettes />
      <SiteHeader activeHref="/historia" shared={shared} />
      <main id="history-content" tabIndex={-1}>
        <article className="history-shell" aria-labelledby="history-title">
          <header className="history-cover">
            <div className="history-cover-copy">
              <p className="history-kicker">Halka · Lubliniec · od 1948 roku</p>
              <h1 id="history-title">Historia<br />pisana <em>razem.</em></h1>
              <p className="history-lead">Pierwsze występy, dalekie podróże, kolejne pokolenia. Otwieramy album Halki i wracamy do ludzi i chwil, od których wszystko się zaczęło.</p>
              <a href="#poczatki" className="history-read-link">Poznaj naszą historię <ArrowRight size={20} aria-hidden="true" /></a>
            </div>
            <div className="history-cover-photo">
              <span className="history-cover-date" aria-hidden="true">1948</span>
              {renderPhoto(openingPhoto, true)}
            </div>
          </header>

          <div className="history-book">
            <aside className="history-index">
              <nav aria-label="Przejdź do okresu w historii Halki">
                <p>Na kartach historii</p>
                <ol ref={indexRef}>
                  {historyChapters.map((chapter) => (
                    <li key={chapter.id}>
                      <a href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? "location" : undefined}>
                        <span>{chapter.years}</span><small>{chapter.label}</small>
                      </a>
                    </li>
                  ))}
                </ol>
                <a href="#poczatek" className="history-back-top"><ArrowUp size={15} aria-hidden="true" /> Na początek</a>
              </nav>
            </aside>

            <div className="history-story">
              {historyChapters.map((chapter) => (
                <div id={chapter.id} className={`history-chapter history-chapter--${chapter.layout ?? "split"}`} key={chapter.id} aria-labelledby={`${chapter.id}-title`}>
                  <div className="history-chapter-copy">
                    <p className="history-years">{chapter.years}</p>
                    <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                    {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {chapter.note && (
                      <details className="history-note">
                        <summary>{chapter.note.title}</summary>
                        <p>{chapter.note.text}</p>
                      </details>
                    )}
                  </div>
                  <div className="history-chapter-photos">{chapter.photos.map((photo) => renderPhoto(photo))}</div>
                </div>
              ))}
              <div className="history-afterword">
                <p>A kolejne strony? Piszemy je wspólnie.</p>
                <Link href="/galeria">Zajrzyj do dzisiejszej Halki <ArrowRight size={20} aria-hidden="true" /></Link>
              </div>
              <footer className="history-source">
                <p>Opowieść i fotografie na podstawie wystawy „Historia Zespołu Pieśni i Tańca «Halka»”, opracowanej z materiałów archiwalnych zespołu. Projekt graficzny wystawy: Urząd Miejski w Lublińcu, Wydział Dialogu Obywatelskiego.</p>
                <p>Zachowaliśmy oryginalny charakter fotografii i datowanie podane na planszach.</p>
                <p>Rozdział „2023–dziś” powstał na podstawie współczesnych materiałów i informacji przekazanych przez zespół.</p>
              </footer>
            </div>
          </div>
        </article>
        <HistoryMap />
      </main>
      <SiteFooter shared={shared} />
      <dialog ref={dialogRef} className="history-lightbox" aria-label="Archiwalna fotografia Halki" aria-describedby="history-photo-caption" onClose={() => setSelectedPhoto(null)} onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}>
        <button type="button" className="history-lightbox-close" onClick={() => dialogRef.current?.close()} aria-label="Zamknij powiększenie"><X size={24} aria-hidden="true" /></button>
        {selectedPhoto && <figure>
          <img src={selectedPhoto.src} width={selectedPhoto.width} height={selectedPhoto.height} alt={selectedPhoto.alt} />
          <figcaption id="history-photo-caption">{selectedPhoto.caption}</figcaption>
        </figure>}
      </dialog>
    </div>
  );
}
