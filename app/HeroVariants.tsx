"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import "./hero-variants.css";

function FolkRosette() {
  return (
    <span className="hv-rosette" aria-hidden="true">
      <img src="/rozeta-tlo.svg" alt="" />
    </span>
  );
}

export function ScrollRosettes() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 170]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [38, -130]);
  const drift = useTransform(scrollYProgress, [0, 1], [-80, 170]);
  const driftReverse = useTransform(scrollYProgress, [0, 1], [110, -160]);
  const scale = useTransform(scrollYProgress, [0, 0.52, 1], [0.9, 1.08, 0.94]);

  return (
    <div className="hv-scroll-decoration" aria-hidden="true">
      <motion.div className="hv-scroll-rosette hv-scroll-rosette-main" style={reduce ? undefined : { rotate, y: drift, scale }}><FolkRosette /></motion.div>
      <motion.div className="hv-scroll-rosette hv-scroll-rosette-secondary" style={reduce ? undefined : { rotate: rotateReverse, y: driftReverse }}><FolkRosette /></motion.div>
      <motion.div className="hv-scroll-diamonds" style={reduce ? undefined : { y: driftReverse }}>
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </motion.div>
    </div>
  );
}

function FolkDivider() {
  return (
    <span className="hv-folk-divider" aria-hidden="true">
      <i />
      <b><span /><span /><span /></b>
      <i />
    </span>
  );
}

function HeroCopy() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="hv-copy"
      initial={reduce ? false : { opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hv-eyebrow">
        <strong>Tu tradycja żyje</strong>
        <FolkDivider />
      </div>
      <h1><span>Od 1948 roku</span><em>tańczymy razem.</em></h1>
      <p>Cztery grupy i wiele pokoleń wspólnie pielęgnują śląskie korzenie na scenach w całej Polsce.</p>
      <div className="hv-actions">
        <a className="hv-button hv-button-primary" href="/dolacz">Dołącz do Halki <ArrowRight size={18} weight="bold" /></a>
        <a className="hv-button hv-button-secondary" href="/zapros-halke">Zaproś nas na wydarzenie</a>
      </div>
      <dl className="hv-proof" aria-label="Najważniejsze informacje o zespole">
        <div><dt>Historia</dt><dd>od 1948</dd></div>
        <div><dt>Zespół</dt><dd>4 grupy</dd></div>
        <div><dt>Nabór</dt><dd>cały rok</dd></div>
      </dl>
    </motion.div>
  );
}

export function DanceHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="hv-hero"
      id="poczatek"
      aria-label="Hero strony głównej"
    >
      <HeroCopy />
      <motion.figure
        className="hv-dance-visual"
        initial={reduce ? false : { opacity: 0, scale: 0.94, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hv-dance-orbit hv-dance-orbit-outer" aria-hidden="true" />
        <span className="hv-dance-orbit hv-dance-orbit-inner" aria-hidden="true" />
        <motion.div
          className="hv-dance-photo"
          animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/home-page-dance-circle.png"
            alt="Tancerka Halki widziana z góry podczas obrotu"
            width={2200}
            height={1467}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
        <figcaption className="hv-dance-caption">
          <span>Halka w ruchu</span>
          <strong>Tradycja, którą tworzymy dziś.</strong>
        </figcaption>
      </motion.figure>
    </section>
  );
}

export function HeroVariants() {
  return (
    <main className="hero-variants-page">
      <ScrollRosettes />
      <header className="hv-header">
        <Link className="hv-brand" href="/" aria-label="Wróć na stronę główną">
          <img src="/logo.jpg" alt="" width="44" height="44" />
          <span><strong>HALKA</strong><small>Lubliniec</small></span>
        </Link>
        <p>Dopracowany kierunek hero</p>
        <Link className="hv-return" href="/"><ArrowLeft size={17} /> Strona główna</Link>
      </header>
      <DanceHero />
      <section className="hv-after" aria-labelledby="hv-after-title">
        <div>
          <p>Wir tradycji</p>
          <h2 id="hv-after-title">Rozpoznawalny ruch. Nowy pierwszy ekran.</h2>
          <span>Duży kolisty kadr wraca ze starej strony. Geometria ornamentu łączy hero z galerią i kostiumami.</span>
        </div>
        <div className="hv-after-points">
          <p><strong>Najpierw człowiek</strong> Zdjęcie pozostaje czyste i czytelne, bez maski rozmywającej jego charakter.</p>
          <p><strong>Folklor w detalu</strong> Drobne romby i rytm linii wspierają kompozycję, zamiast konkurować z nią.</p>
          <p><strong>Ruch ze scrollem</strong> Rozety podążają za przewijaniem, a hero respektuje ograniczenie animacji.</p>
        </div>
      </section>
    </main>
  );
}
