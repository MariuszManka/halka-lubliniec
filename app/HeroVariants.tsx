"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./hero-variants.css";

type HeroId = "dance" | "generations" | "ensemble";

const heroOptions: Array<{ id: HeroId; key: string; label: string; summary: string }> = [
  { id: "dance", key: "A", label: "Wir tradycji", summary: "Najbardziej dynamiczny i najbliższy charakterowi poprzedniego hero." },
  { id: "generations", key: "B", label: "Pokolenia", summary: "Ciepły, ludzki kierunek pokazujący, że Halka naprawdę łączy pokolenia." },
  { id: "ensemble", key: "C", label: "Wspólna scena", summary: "Najbardziej reprezentacyjny wariant, pokazujący skalę i różnorodność zespołu." },
];

function FolkRosette({ className = "" }: { className?: string }) {
  return (
    <span className={`hv-rosette ${className}`} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ "--petal": index } as React.CSSProperties} />)}
      <b />
    </span>
  );
}

function ScrollRosettes() {
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

function FolkEyebrow() {
  return (
    <div className="hv-eyebrow">
      <span className="hv-eyebrow-ornament hv-eyebrow-left"><i /><i /></span>
      <strong>Tu tradycja żyje</strong>
      <span className="hv-eyebrow-ornament hv-eyebrow-right"><i /><i /></span>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="hv-copy">
      <FolkEyebrow />
      <h1><span>Od 1948 roku</span><em>tańczymy razem.</em></h1>
      <p>Cztery grupy i wiele pokoleń wspólnie pielęgnują śląskie korzenie na scenach w całej Polsce.</p>
      <div className="hv-actions">
        <a className="hv-button hv-button-primary" href="/dolacz">Dołącz do Halki <ArrowRight size={18} weight="bold" /></a>
        <a className="hv-button hv-button-secondary" href="/zapros-halke">Zaproś nas na wydarzenie</a>
      </div>
    </div>
  );
}

function DanceHero() {
  const reduce = useReducedMotion();
  return (
    <section className="hv-hero hv-hero-dance" aria-label="Wariant A: Wir tradycji">
      <HeroCopy />
      <motion.figure className="hv-dance-visual" initial={reduce ? false : { opacity: 0, scale: 0.94, x: 28 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <span className="hv-dance-orbit hv-dance-orbit-outer" aria-hidden="true" />
        <span className="hv-dance-orbit hv-dance-orbit-inner" aria-hidden="true" />
        <motion.div className="hv-dance-photo" animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5], y: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <img src="/session/dance-circle.webp" alt="Tancerka Halki widziana z góry podczas obrotu" width="2200" height="1467" fetchPriority="high" />
        </motion.div>
        <span className="hv-dance-thread" aria-hidden="true"><i /><i /><i /></span>
      </motion.figure>
    </section>
  );
}

function GenerationsHero() {
  const reduce = useReducedMotion();
  return (
    <section className="hv-hero hv-hero-generations" aria-label="Wariant B: Pokolenia">
      <HeroCopy />
      <motion.div className="hv-generations-visual" initial={reduce ? false : { opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <figure className="hv-generations-adults"><img src="/session/krakow-worn-1.webp" alt="Dwoje dorosłych członków Halki w strojach krakowskich" width="1467" height="2200" fetchPriority="high" /></figure>
        <figure className="hv-generations-children"><img src="/session/children-group.webp" alt="Najmłodsza grupa Halki na scenie" width="2200" height="1467" /></figure>
        <span className="hv-generations-stitch" aria-hidden="true"><i /><i /><i /><i /></span>
      </motion.div>
    </section>
  );
}

function EnsembleHero() {
  const reduce = useReducedMotion();
  return (
    <section className="hv-hero hv-hero-ensemble" aria-label="Wariant C: Wspólna scena">
      <HeroCopy />
      <motion.figure className="hv-ensemble-photo" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <img src="/session/group.webp" alt="Wspólne zdjęcie wszystkich pokoleń zespołu Halka" width="2200" height="1467" fetchPriority="high" />
      </motion.figure>
      <div className="hv-ensemble-mark" aria-hidden="true"><FolkRosette /></div>
    </section>
  );
}

function ActiveHero({ active }: { active: HeroId }) {
  if (active === "generations") return <GenerationsHero />;
  if (active === "ensemble") return <EnsembleHero />;
  return <DanceHero />;
}

export function HeroVariants() {
  const [active, setActive] = useState<HeroId>("dance");
  const selected = heroOptions.find((option) => option.id === active) ?? heroOptions[0];

  return (
    <main className={`hero-variants-page hero-variants-page-${active}`}>
      <ScrollRosettes />
      <header className="hv-header">
        <a className="hv-brand" href="/" aria-label="Wróć na stronę główną"><img src="/logo.jpg" alt="" width="44" height="44" /><span><strong>HALKA</strong><small>Lubliniec</small></span></a>
        <div className="hv-selector" role="group" aria-label="Wybierz wariant hero strony głównej">
          {heroOptions.map((option) => (
            <button type="button" className={option.id === active ? "is-active" : ""} aria-pressed={option.id === active} key={option.id} onClick={() => setActive(option.id)}>
              <span>{option.key}</span><strong>{option.label}</strong>
            </button>
          ))}
        </div>
        <a className="hv-return" href="/"><ArrowLeft size={17} /> Strona główna</a>
      </header>
      <ActiveHero key={active} active={active} />
      <section className="hv-after" aria-labelledby="hv-after-title">
        <div><p>Wariant {selected.key}</p><h2 id="hv-after-title">{selected.label}</h2><span>{selected.summary}</span></div>
        <div className="hv-after-points">
          <p><strong>Jeden cel</strong> Nabór pozostaje pierwszym, najmocniejszym działaniem.</p>
          <p><strong>Jedna animacja</strong> Wybrana rozeta reaguje na przewijanie w każdym wariancie.</p>
          <p><strong>Pierwszy ekran</strong> Treść, zdjęcia i oba CTA mieszczą się bez przewijania.</p>
        </div>
      </section>
    </main>
  );
}
