"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./hero-variants.css";

type VariantId = "rosette" | "sprig" | "weave";

const variants: Array<{ id: VariantId; short: string; name: string; note: string }> = [
  {
    id: "rosette",
    short: "A",
    name: "Rozeta w ruchu",
    note: "Najbliżej starego hero. Tancerka i rozeta pracują w jednym rytmie.",
  },
  {
    id: "sprig",
    short: "B",
    name: "Haftowana gałązka",
    note: "Spokojniejszy kadr, pełne sylwetki i ornament rozwijający się podczas przewijania.",
  },
  {
    id: "weave",
    short: "C",
    name: "Rytm haftu",
    note: "Najbardziej geometryczny wariant, oparty na pasach, rombach i scenicznej energii.",
  },
];

function FolkFlower({ className = "" }: { className?: string }) {
  return (
    <span className={`hero-folk-flower ${className}`} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ "--hero-petal": index } as React.CSSProperties} />
      ))}
      <b />
    </span>
  );
}

function FolkLabel() {
  return (
    <div className="hero-folk-label">
      <span className="hero-folk-label-side hero-folk-label-side-left"><i /><i /></span>
      <strong>Tu tradycja żyje</strong>
      <span className="hero-folk-label-side hero-folk-label-side-right"><i /><i /></span>
    </div>
  );
}

function ScrollFolkBackdrop({ variant }: { variant: VariantId }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const turn = useTransform(scrollYProgress, [0, 1], [-16, 164]);
  const reverseTurn = useTransform(scrollYProgress, [0, 1], [34, -112]);
  const drift = useTransform(scrollYProgress, [0, 1], [-90, 170]);
  const reverseDrift = useTransform(scrollYProgress, [0, 1], [120, -150]);
  const spread = useTransform(scrollYProgress, [0, 0.45, 1], [0.88, 1.08, 0.94]);
  const ribbonX = useTransform(scrollYProgress, [0, 1], [-90, 110]);
  const reverseRibbonX = useTransform(scrollYProgress, [0, 1], [90, -110]);

  return (
    <div className={`hero-scroll-folk hero-scroll-folk-${variant}`} aria-hidden="true">
      {variant === "rosette" && (
        <>
          <motion.div className="hero-scroll-rosette hero-scroll-rosette-main" style={reduce ? undefined : { rotate: turn, y: drift, scale: spread }}>
            <FolkFlower />
          </motion.div>
          <motion.div className="hero-scroll-rosette hero-scroll-rosette-small" style={reduce ? undefined : { rotate: reverseTurn, y: reverseDrift }}>
            <FolkFlower />
          </motion.div>
        </>
      )}

      {variant === "sprig" && (
        <>
          <motion.div className="hero-scroll-vine hero-scroll-vine-left" style={reduce ? undefined : { y: drift }}>
            <span className="hero-scroll-stem" />
            {Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--leaf-index": index } as React.CSSProperties} />)}
            <FolkFlower />
          </motion.div>
          <motion.div className="hero-scroll-vine hero-scroll-vine-right" style={reduce ? undefined : { y: reverseDrift }}>
            <span className="hero-scroll-stem" />
            {Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--leaf-index": index } as React.CSSProperties} />)}
            <FolkFlower />
          </motion.div>
        </>
      )}

      {variant === "weave" && (
        <>
          <motion.div className="hero-scroll-band hero-scroll-band-one" style={reduce ? undefined : { x: ribbonX }}>
            {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
          </motion.div>
          <motion.div className="hero-scroll-band hero-scroll-band-two" style={reduce ? undefined : { x: reverseRibbonX }}>
            {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
          </motion.div>
          <motion.div className="hero-scroll-rosette hero-scroll-rosette-weave" style={reduce ? undefined : { rotate: turn, y: reverseDrift }}>
            <FolkFlower />
          </motion.div>
        </>
      )}
    </div>
  );
}

function HeroVisual({ variant }: { variant: VariantId }) {
  const reduce = useReducedMotion();

  if (variant === "sprig") {
    return (
      <motion.figure
        className="hero-variant-visual hero-variant-visual-sprig"
        initial={reduce ? false : { opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-sprig-photo">
          <img src="/session/costume-hero-new.webp" alt="Dwie tancerki Halki w pełnych strojach ludowych" width="1467" height="2200" />
        </div>
        <span className="hero-sprig-line" aria-hidden="true"><i /><i /><i /></span>
      </motion.figure>
    );
  }

  if (variant === "weave") {
    return (
      <motion.figure
        className="hero-variant-visual hero-variant-visual-weave"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-weave-frame">
          <motion.img
            src="/session/dance-circle.webp"
            alt="Tancerka Halki widziana z góry podczas obrotu"
            width="2200"
            height="1467"
            animate={reduce ? undefined : { rotate: [-1.2, 1.2, -1.2], scale: [1, 1.018, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="hero-weave-corner hero-weave-corner-top" aria-hidden="true" />
        <span className="hero-weave-corner hero-weave-corner-bottom" aria-hidden="true" />
      </motion.figure>
    );
  }

  return (
    <motion.figure
      className="hero-variant-visual hero-variant-visual-rosette"
      initial={reduce ? false : { opacity: 0, scale: 0.93, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="hero-rosette-orbit hero-rosette-orbit-one" aria-hidden="true" />
      <span className="hero-rosette-orbit hero-rosette-orbit-two" aria-hidden="true" />
      <motion.div
        className="hero-rosette-photo"
        animate={reduce ? undefined : { rotate: [-1.6, 1.6, -1.6], y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/session/dance-circle.webp" alt="Tancerka Halki widziana z góry podczas obrotu" width="2200" height="1467" />
      </motion.div>
    </motion.figure>
  );
}

export function HeroVariants() {
  const [active, setActive] = useState<VariantId>("rosette");
  const selected = variants.find((variant) => variant.id === active) ?? variants[0];
  const reduce = useReducedMotion();

  return (
    <main className={`hero-variants-page hero-variants-page-${active}`}>
      <ScrollFolkBackdrop variant={active} />

      <header className="hero-variants-header">
        <a className="hero-variants-brand" href="/" aria-label="Wróć na stronę główną">
          <img src="/logo.jpg" alt="" width="44" height="44" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </a>

        <div className="hero-variants-tabs" role="group" aria-label="Wybierz wariant hero">
          {variants.map((variant) => (
            <button
              className={variant.id === active ? "is-active" : ""}
              type="button"
              key={variant.id}
              aria-pressed={variant.id === active}
              onClick={() => setActive(variant.id)}
            >
              <span>{variant.short}</span><strong>{variant.name}</strong>
            </button>
          ))}
        </div>

        <a className="hero-variants-return" href="/"><ArrowLeft size={17} /> Strona główna</a>
      </header>

      <section className="hero-variant-stage" aria-labelledby="hero-variant-title">
        <motion.div
          className="hero-variant-copy"
          key={`${active}-copy`}
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <FolkLabel />
          <h1 id="hero-variant-title">Od 1948 roku <em>tańczymy razem.</em></h1>
          <p>Cztery grupy i wiele pokoleń wspólnie pielęgnują śląskie korzenie na scenach w całej Polsce.</p>
          <div className="hero-variant-actions">
            <a className="hero-variant-button hero-variant-button-primary" href="/dolacz">Dołącz do Halki <ArrowRight size={18} weight="bold" /></a>
            <a className="hero-variant-button hero-variant-button-secondary" href="/zapros-halke">Zaproś nas na wydarzenie</a>
          </div>
        </motion.div>

        <HeroVisual key={`${active}-visual`} variant={active} />
      </section>

      <section className="hero-variant-motion-demo" aria-labelledby="motion-demo-title">
        <div>
          <p>Wariant {selected.short}</p>
          <h2 id="motion-demo-title">{selected.name}</h2>
          <span>{selected.note}</span>
        </div>
        <div className="hero-variant-demo-grid">
          <article><strong>Ruch ze scrollem</strong><p>Ornament podąża za stroną i zmienia pozycję, obrót lub rytm podczas przewijania.</p></article>
          <article><strong>Czytelny pierwszy ekran</strong><p>Oba główne działania pozostają widoczne bez przewijania na desktopie i telefonie.</p></article>
          <article><strong>Spokojniejszy tryb</strong><p>Przy ograniczeniu animacji kompozycja pozostaje kompletna, ale wszystkie ruchy zostają wyłączone.</p></article>
        </div>
      </section>

      <section className="hero-variant-choice">
        <FolkFlower />
        <p>Wybierz A, B albo C. W kolejnym kroku przeniosę wybrany kierunek na właściwą stronę główną.</p>
      </section>
    </main>
  );
}
