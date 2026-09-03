"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  House,
  List,
  Palette,
  PersonArmsSpread,
  Sparkle,
  Stack,
  X,
} from "@phosphor-icons/react";
import { costumeFacts, costumeLooks } from "../content/costumes";
import { costumeModalImages } from "../content/generated-costume-modal";
import { sessionImages } from "../content/generated-session";

const navItems = [
  ["Galeria", "/galeria"],
  ["Kostiumy", "/kostiumy"],
  ["Historia", "/historia"],
  ["Terminarz", "/#terminarz"],
  ["Kontakt", "/#kontakt"],
] as const;

const costumeImageFocus: Record<string, string> = {
  "costume-hero-new": "50% 30%",
  "costume-hero-detail": "50% 48%",
  "cieszyn-worn-1": "50% 14%",
  "krakow-worn-1": "50% 12%",
  "lublin-worn-1": "50% 16%",
  "lublin-worn-male": "50% 15%",
  "rzeszow-worn-1": "50% 12%",
  "zywiec-worn-1": "50% 16%",
  "pszczyna-worn-1": "50% 12%",
  "mining-worn-1": "50% 15%",
  "national-worn-1": "50% 12%",
};

function imageFocus(name: string) {
  if (costumeImageFocus[name]) return costumeImageFocus[name];
  if (name.startsWith("modal-") && !name.includes("detail")) return "50% 18%";
  return "50% 50%";
}

function findCostumeImage(name: string) {
  return sessionImages.find((item) => item.name === name);
}

function CostumeImage({
  name,
  className = "",
  loading = "lazy",
}: {
  name: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const image = findCostumeImage(name);
  if (!image) return null;
  return (
    <img
      className={className}
      data-costume-image={name}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "auto"}
      style={{ "--costume-focus": imageFocus(name) } as CSSProperties}
    />
  );
}

function CostumePreviewImage({ name }: { name: string }) {
  const image = findCostumeImage(name);
  if (!image) return null;

  return (
    <span
      className="costume-look-image"
      style={{
        "--costume-focus": imageFocus(name),
      } as CSSProperties}
    >
      <CostumeImage name={name} />
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FolkRosette({ className = "" }: { className?: string }) {
  return (
    <span className={`folk-rosette ${className}`} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ "--petal": index } as CSSProperties} />
      ))}
      <b />
    </span>
  );
}

function CostumeDivider() {
  return (
    <span className="costume-folk-divider" aria-hidden="true">
      <i />
      <b><span /><span /><span /></b>
      <i />
    </span>
  );
}

function CostumeBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const leftY = useTransform(scrollYProgress, [0, 1], [-120, 260]);
  const rightY = useTransform(scrollYProgress, [0, 1], [180, -230]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-24, 112]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [54, -92]);
  const threadY = useTransform(scrollYProgress, [0, 1], [100, -170]);

  return (
    <div className="costumes-backdrop" aria-hidden="true">
      <motion.div className="costumes-backdrop-thread" style={reduce ? undefined : { y: threadY }}>
        {Array.from({ length: 30 }, (_, index) => <span key={index} />)}
      </motion.div>
      <motion.div className="costumes-backdrop-rosette costumes-backdrop-rosette-left" style={reduce ? undefined : { y: leftY, rotate: leftRotate }}>
        <FolkRosette />
      </motion.div>
      <motion.div className="costumes-backdrop-rosette costumes-backdrop-rosette-right" style={reduce ? undefined : { y: rightY, rotate: rightRotate }}>
        <FolkRosette />
      </motion.div>
    </div>
  );
}

export function CostumesPage() {
  const reduce = useReducedMotion();
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLook, setActiveLook] = useState<number | null>(null);
  const [catalogueGroup, setCatalogueGroup] = useState<"female" | "male">("female");
  const [activeGroup, setActiveGroup] = useState<"female" | "male">("female");
  const [activePhoto, setActivePhoto] = useState(0);
  const look = activeLook === null ? null : costumeLooks[activeLook];
  const modalSet = look
    ? costumeModalImages[look.galleryKey as keyof typeof costumeModalImages]
    : null;
  const allowsFemale = look ? !look.genders || look.genders.includes("female") : false;
  const allowsMale = look ? !look.genders || look.genders.includes("male") : false;
  const femaleGallery = modalSet && allowsFemale ? modalSet.female : [];
  const maleGallery = modalSet && allowsMale ? modalSet.male : [];
  const gallery = look
    ? activeGroup === "female"
      ? femaleGallery
      : maleGallery
    : [];

  const visibleLooks = costumeLooks
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.genders || item.genders.includes(catalogueGroup));

  const chooseLook = (index: number, preferredGroup = catalogueGroup) => {
    const selected = costumeLooks[index];
    const selectedSet = costumeModalImages[selected.galleryKey as keyof typeof costumeModalImages];
    const preferredAvailable = (!selected.genders || selected.genders.includes(preferredGroup)) && selectedSet?.[preferredGroup].length;
    const femaleAvailable = (!selected.genders || selected.genders.includes("female")) && selectedSet?.female.length;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveLook(index);
    setActiveGroup(preferredAvailable ? preferredGroup : femaleAvailable ? "female" : "male");
    setActivePhoto(0);
  };

  const chooseCatalogueGroup = (group: "female" | "male") => {
    setCatalogueGroup(group);
  };

  const chooseGroup = (group: "female" | "male") => {
    setActiveGroup(group);
    setActivePhoto(0);
  };

  const changePhoto = useCallback((direction: number) => {
    if (!gallery.length) return;
    setActivePhoto((current) => (current + direction + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (activeLook === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveLook(null);
      if (event.key === "ArrowLeft") changePhoto(-1);
      if (event.key === "ArrowRight") changePhoto(1);
      if (event.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      previousFocusRef.current?.focus();
    };
  }, [activeLook, activeGroup, changePhoto]);

  return (
    <main className="costumes-page">
      <CostumeBackdrop />

      <header className="site-header chronicle-site-header costumes-site-header">
        <Link className="brand" href="/" aria-label="Halka, wróć na stronę główną">
          <img src="/logo.jpg" alt="" width="48" height="48" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {navItems.map(([label, href]) => (
            <Link className={href === "/kostiumy" ? "active" : ""} key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <Link className="header-cta chronicle-home-link" href="/"><House size={17} /> Strona główna</Link>
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
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
              <Link href="/" onClick={() => setMenuOpen(false)}>Strona główna</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="costumes-hero section-shell">
        <motion.div
          className="costumes-hero-copy"
          initial={reduce ? false : { opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link className="chronicle-breadcrumb" href="/"><ArrowLeft size={16} /> Strona główna</Link>
          <h1>Kostiumy</h1>
          <CostumeDivider />
          <p>Każdy haft, fałda i wstążka pracuje razem z ruchem. Zobacz stroje Halki od sylwetki po detal.</p>
          <div className="costumes-hero-actions" aria-label="Wybierz część kolekcji">
            <a className="button button-primary" href="#kolekcja" onClick={() => chooseCatalogueGroup("female")}>Stroje damskie</a>
            <a className="button button-secondary" href="#kolekcja" onClick={() => chooseCatalogueGroup("male")}>Stroje męskie</a>
          </div>
        </motion.div>

        <motion.div
          className="costumes-hero-collage"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.figure
            className="costumes-hero-main"
            initial={reduce ? false : { clipPath: "inset(0 0 0 14% round 20px)", opacity: 0.82 }}
            animate={{ clipPath: "inset(0 0 0 0% round 20px)", opacity: 1 }}
            transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            <CostumeImage name="costume-hero-new" loading="eager" />
          </motion.figure>
          <motion.figure
            className="costumes-hero-detail"
            initial={reduce ? false : { opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.72, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <CostumeImage name="costume-hero-detail" loading="eager" />
          </motion.figure>
          <p className="costumes-hero-caption"><Sparkle size={15} weight="fill" /> Strój krzczonowski, Lubelszczyzna</p>
          <span className="costumes-hero-stitch" aria-hidden="true" />
        </motion.div>
      </section>

      <section className="costumes-intro section-shell" aria-labelledby="costumes-intro-title">
        <Reveal className="costumes-intro-title">
          <h2 id="costumes-intro-title">Nie tylko ubiór.<br /><em>Część opowieści.</em></h2>
        </Reveal>
        <Reveal className="costumes-intro-copy" delay={0.08}>
          <p>Kostium porządkuje obraz zespołu, podkreśla gest i pozwala rozpoznać charakter scenicznej opowieści. To, co z widowni tworzy jedną barwną całość, z bliska okazuje się kompozycją wielu warstw.</p>
          <div className="costumes-intro-facts">
            <span><Stack size={22} /><strong>Warstwy</strong><small>forma i proporcja</small></span>
            <span><Palette size={22} /><strong>Kolor</strong><small>rytm i kontrast</small></span>
            <span><PersonArmsSpread size={22} /><strong>Ruch</strong><small>kostium na scenie</small></span>
          </div>
        </Reveal>
      </section>

      <section className="costume-catalogue section-shell" id="kolekcja" aria-labelledby="costume-catalogue-title">
        <Reveal className="costume-catalogue-heading">
          <div>
            <h2 id="costume-catalogue-title">Wybierz region.</h2>
          </div>
          <p>Najpierw wybierz stroje damskie lub męskie, potem otwórz region i zobacz pełne sylwetki oraz detale.</p>
        </Reveal>

        <Reveal className="costume-catalogue-toolbar" delay={0.06}>
          <div className={`costume-catalogue-groups is-${catalogueGroup}`} role="tablist" aria-label="Rodzaj stroju">
            <button type="button" role="tab" aria-selected={catalogueGroup === "female"} className={catalogueGroup === "female" ? "active" : ""} onClick={() => chooseCatalogueGroup("female")}>Stroje damskie</button>
            <button type="button" role="tab" aria-selected={catalogueGroup === "male"} className={catalogueGroup === "male" ? "active" : ""} onClick={() => chooseCatalogueGroup("male")}>Stroje męskie</button>
          </div>
          <p aria-live="polite">{visibleLooks.length} {visibleLooks.length === 1 ? "region" : "regionów"} w tej części kolekcji</p>
        </Reveal>

        <div className="costume-look-grid" role="list" aria-label="Kategorie kostiumów">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleLooks.map(({ item, index }, visibleIndex) => {
              const catalogueModalSet = costumeModalImages[item.galleryKey as keyof typeof costumeModalImages];
              const preview = catalogueGroup === "female"
                ? item.femaleImages?.[0]
                : catalogueModalSet?.male[0] ?? item.maleImages?.[0];
              return (
                <motion.div
                  layout
                  key={`${catalogueGroup}-${item.title}`}
                  className="costume-look-reveal"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.42, delay: visibleIndex * 0.035, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    className={`costume-look-card ${activeLook === index ? "active" : ""}`}
                    onClick={() => chooseLook(index, catalogueGroup)}
                    aria-pressed={activeLook === index}
                    aria-label={`Otwórz ${item.title}, ${catalogueGroup === "female" ? "stroje damskie" : "stroje męskie"}`}
                  >
                    <CostumePreviewImage name={preview ?? item.images[0]} />
                    <span className="costume-look-meta">
                      <span className="costume-look-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong></span>
                      <span className="costume-look-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </section>

      <AnimatePresence>
        {look && gallery.length > 0 && (
          <motion.div
            className="costume-modal-backdrop"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveLook(null);
            }}
          >
            <motion.section
              ref={modalRef}
              className="costume-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="costume-modal-title"
              aria-describedby="costume-modal-description"
              initial={reduce ? false : { opacity: 0, y: 34, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="costume-modal-header">
                <span>{look.eyebrow}<b>{activeGroup === "female" ? "Strój damski" : "Strój męski"}</b></span>
                <button type="button" onClick={() => setActiveLook(null)} aria-label="Zamknij prezentację stroju" autoFocus>
                  <X size={22} />
                </button>
              </header>

              <div className="costume-modal-layout">
                <div className="costume-modal-gallery">
                  <AnimatePresence mode="wait">
                    <motion.div
                      className="costume-modal-main-image"
                      key={`${activeGroup}-${gallery[activePhoto]}`}
                      initial={reduce ? false : { opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CostumeImage name={gallery[activePhoto]} />
                    </motion.div>
                  </AnimatePresence>
                  {gallery.length > 1 && (
                    <div className="costume-modal-arrows">
                      <button type="button" onClick={() => changePhoto(-1)} aria-label="Poprzednie zdjęcie"><ArrowLeft size={20} /></button>
                      <span>{String(activePhoto + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
                      <button type="button" onClick={() => changePhoto(1)} aria-label="Następne zdjęcie"><ArrowRight size={20} /></button>
                    </div>
                  )}
                </div>

                <div className="costume-modal-story">
                  <h3 id="costume-modal-title">{look.title}</h3>
                  <p id="costume-modal-description">{look.description}</p>

                  <div className={`costume-modal-groups is-${activeGroup}`} role="tablist" aria-label="Wersja stroju">
                    {femaleGallery.length ? (
                      <button type="button" role="tab" aria-selected={activeGroup === "female"} className={activeGroup === "female" ? "active" : ""} onClick={() => chooseGroup("female")}>
                        <span>Strój damski</span><small aria-label={`${femaleGallery.length} zdjęć`}>{femaleGallery.length}</small>
                      </button>
                    ) : null}
                    {maleGallery.length ? (
                      <button type="button" role="tab" aria-selected={activeGroup === "male"} className={activeGroup === "male" ? "active" : ""} onClick={() => chooseGroup("male")}>
                        <span>Strój męski</span><small aria-label={`${maleGallery.length} zdjęć`}>{maleGallery.length}</small>
                      </button>
                    ) : null}
                  </div>

                  <ul>
                    {look.details.map((detail) => <li key={detail}><Check size={16} weight="bold" /> {detail}</li>)}
                  </ul>

                  <div className="costume-modal-thumbnails" role="tabpanel" aria-label={`${activeGroup === "female" ? "Strój damski" : "Strój męski"}: ${look.title}`}>
                    {gallery.map((imageName, index) => (
                      <button
                        type="button"
                        className={activePhoto === index ? "active" : ""}
                        aria-label={`Pokaż zdjęcie ${index + 1}`}
                        aria-pressed={activePhoto === index}
                        onClick={() => setActivePhoto(index)}
                        key={imageName}
                      >
                        <CostumeImage name={imageName} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="costume-anatomy section-shell" aria-labelledby="costume-anatomy-title">
        <Reveal className="costume-anatomy-heading">
          <h2 id="costume-anatomy-title">To detal buduje całość.</h2>
        </Reveal>
        <div className="costume-anatomy-grid">
          {costumeFacts.map((fact, index) => (
            <Reveal className="costume-anatomy-card" delay={index * 0.05} key={fact.title}>
              <figure><CostumeImage name={fact.image} /><span>{String(index + 1).padStart(2, "0")}</span></figure>
              <div>
                <small>{fact.region}</small>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
                <a href={fact.sourceUrl} target={fact.sourceUrl.startsWith("http") ? "_blank" : undefined} rel={fact.sourceUrl.startsWith("http") ? "noreferrer" : undefined}>
                  {fact.sourceLabel} <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="costume-cta section-shell">
        <span className="costume-cta-ornament costume-cta-ornament-left"><FolkRosette /><i /><i /><i /></span>
        <span className="costume-cta-ornament costume-cta-ornament-right"><FolkRosette /><i /><i /><i /></span>
        <h2>Poznaj Halkę bliżej.</h2>
        <p>Zobacz nasze koncerty, wspomnienia i ludzi, którzy każdego dnia ożywiają te kostiumy.</p>
        <Link className="button button-primary" href="/galeria">Przejdź do galerii <ArrowRight size={18} /></Link>
      </section>

      <footer className="footer section-shell">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="Logo Zespołu Pieśni i Tańca Halka" width="70" height="70" />
          <div><strong>HALKA</strong><span>Pieśń. Taniec. Pokolenia.</span></div>
        </div>
        <div className="footer-links">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <p>© 2026 Zespół Pieśni i Tańca Halka w Lublińcu</p>
      </footer>
    </main>
  );
}
