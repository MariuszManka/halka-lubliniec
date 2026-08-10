"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
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
import { sessionImages } from "../content/generated-session";

const navItems = [
  ["Galeria", "/galeria"],
  ["Kostiumy", "/kostiumy"],
  ["Historia", "/#historia"],
  ["Terminarz", "/#terminarz"],
  ["Kontakt", "/#kontakt"],
] as const;

function CostumeImage({
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLook, setActiveLook] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState<"female" | "male">("female");
  const [activePhoto, setActivePhoto] = useState(0);
  const look = activeLook === null ? null : costumeLooks[activeLook];
  const gallery = look
    ? activeGroup === "female"
      ? look.femaleImages ?? []
      : look.maleImages ?? []
    : [];

  const chooseLook = (index: number) => {
    const selected = costumeLooks[index];
    setActiveLook(index);
    setActiveGroup(selected.femaleImages?.length ? "female" : "male");
    setActivePhoto(0);
  };

  const chooseGroup = (group: "female" | "male") => {
    setActiveGroup(group);
    setActivePhoto(0);
  };

  const changePhoto = (direction: number) => {
    if (!gallery.length) return;
    setActivePhoto((current) => (current + direction + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (activeLook === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveLook(null);
      if (event.key === "ArrowLeft") changePhoto(-1);
      if (event.key === "ArrowRight") changePhoto(1);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeLook, activeGroup, gallery.length]);

  return (
    <main className="costumes-page">
      <CostumeBackdrop />

      <header className="site-header chronicle-site-header costumes-site-header">
        <a className="brand" href="/" aria-label="Halka, wróć na stronę główną">
          <img src="/logo.jpg" alt="" width="48" height="48" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {navItems.map(([label, href]) => (
            <a className={href === "/kostiumy" ? "active" : ""} key={href} href={href}>{label}</a>
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

      <section className="costumes-hero section-shell">
        <motion.div
          className="costumes-hero-copy"
          initial={reduce ? false : { opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
        >
          <a className="chronicle-breadcrumb" href="/"><ArrowLeft size={16} /> Strona główna</a>
          <p className="section-kicker">Kolekcja Zespołu Halka</p>
          <h1>Kostiumy</h1>
          <CostumeDivider />
          <p>Na scenie każdy haft, fałda i wstążka pracuje razem z ruchem. Zobacz stroje Halki z bliska — od całej sylwetki po najmniejszy detal.</p>
          <a className="button button-primary" href="#kolekcja">Poznaj kolekcję <ArrowRight size={18} /></a>
        </motion.div>

        <motion.div
          className="costumes-hero-collage"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <figure className="costumes-hero-main">
            <CostumeImage name="costume-hero-new" loading="eager" />
            <figcaption><span>01</span><strong>Lubelszczyzna</strong></figcaption>
          </figure>
          <figure className="costumes-hero-detail">
            <CostumeImage name="costume-hero-detail" loading="eager" />
            <figcaption><Sparkle size={16} weight="fill" /> Detal stroju</figcaption>
          </figure>
          <span className="costumes-hero-stitch" aria-hidden="true" />
        </motion.div>
      </section>

      <section className="costumes-intro section-shell" aria-labelledby="costumes-intro-title">
        <Reveal className="costumes-intro-title">
          <p className="section-kicker">Strój sceniczny</p>
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
            <p className="section-kicker">Katalog kostiumów</p>
            <h2 id="costume-catalogue-title">Wybierz opowieść.</h2>
          </div>
          <p>Każda kategoria otwiera własny zestaw fotografii: od całej sylwetki po elementy, które łatwo przeoczyć z widowni.</p>
        </Reveal>

        <Reveal className="costume-catalogue-note" delay={0.06}>
          Fotografie przedstawiają kostiumy sceniczne Halki, uporządkowane według regionów i tradycji, do których nawiązują.
        </Reveal>

        <div className="costume-look-grid" role="list" aria-label="Kategorie kostiumów">
          {costumeLooks.map((item, index) => (
            <Reveal key={item.title} className="costume-look-reveal" delay={index * 0.05}>
              <button
                type="button"
                className={`costume-look-card ${activeLook === index ? "active" : ""}`}
                onClick={() => chooseLook(index)}
                aria-pressed={activeLook === index}
              >
                <span className="costume-look-image"><CostumeImage name={item.images[0]} /></span>
                <span className="costume-look-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="costume-look-copy"><small>{item.eyebrow}</small><strong>{item.title}</strong></span>
                <span className="costume-look-arrow"><ArrowUpRight size={19} /></span>
              </button>
            </Reveal>
          ))}
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
              className="costume-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="costume-modal-title"
              initial={reduce ? false : { opacity: 0, y: 34, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="costume-modal-header">
                <span><b>{String((activeLook ?? 0) + 1).padStart(2, "0")}</b> {look.eyebrow}</span>
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
                  <p className="section-kicker">Kolekcja regionalna</p>
                  <h3 id="costume-modal-title">{look.title}</h3>
                  <p>{look.description}</p>

                  <div className="costume-modal-groups" role="tablist" aria-label="Wersja stroju">
                    {look.femaleImages?.length ? (
                      <button type="button" role="tab" aria-selected={activeGroup === "female"} className={activeGroup === "female" ? "active" : ""} onClick={() => chooseGroup("female")}>
                        Strój damski <small>{look.femaleImages.length} zdjęć</small>
                      </button>
                    ) : null}
                    {look.maleImages?.length ? (
                      <button type="button" role="tab" aria-selected={activeGroup === "male"} className={activeGroup === "male" ? "active" : ""} onClick={() => chooseGroup("male")}>
                        Strój męski <small>{look.maleImages.length} zdjęć</small>
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
          <p className="section-kicker">Anatomia stroju</p>
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

      <section className="costume-motion section-shell" aria-labelledby="costume-motion-title">
        <Reveal className="costume-motion-shell">
          <div className="costume-motion-visual">
            <CostumeImage name="dance-circle" />
            <span>Forma<br />w ruchu</span>
          </div>
          <div className="costume-motion-copy">
            <p className="section-kicker">Kostium w ruchu</p>
            <h2 id="costume-motion-title">Zaprojektowany, by tańczyć.</h2>
            <p>Szerokość spódnicy, układ warstw i kontrastowe obszycia nie są przypadkowe. Podczas obrotu kostium rysuje choreografię razem z tancerzem — kolor zaznacza kierunek, a fałdy podkreślają tempo.</p>
            <div className="costume-motion-points">
              <span><b>01</b> gest podkreślony linią stroju</span>
              <span><b>02</b> kolor czytelny z widowni</span>
              <span><b>03</b> warstwy pracujące w obrocie</span>
            </div>
            <a className="text-link" href="/galeria">Zobacz kostiumy na scenie <ArrowRight size={18} /></a>
          </div>
          <div className="costume-motion-strip" aria-hidden="true">
            <CostumeImage name="dance-circle-two" />
            <CostumeImage name="lublin-worn-1" />
          </div>
        </Reveal>
      </section>

      <section className="costume-cta section-shell">
        <span className="costume-cta-ornament costume-cta-ornament-left"><FolkRosette /><i /><i /><i /></span>
        <span className="costume-cta-ornament costume-cta-ornament-right"><FolkRosette /><i /><i /><i /></span>
        <p className="section-kicker">Pieśń. Taniec. Pokolenia.</p>
        <h2>Poznaj Halkę bliżej.</h2>
        <p>Zobacz nasze koncerty, wspomnienia i ludzi, którzy każdego dnia ożywiają te kostiumy.</p>
        <a className="button button-primary" href="/galeria">Przejdź do galerii <ArrowRight size={18} /></a>
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
    </main>
  );
}
