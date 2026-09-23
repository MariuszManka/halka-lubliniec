"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ScrollRosettes } from "./FolkRosette";
import "./hero-variants.css";
import type { CopyMap } from "../content/page-copy-defaults";
import type { SharedContent } from "../sanity/content";
import { SiteFooter } from "./SiteFooter";

function FolkDivider() {
  return (
    <span className="hv-folk-divider" aria-hidden="true">
      <i />
      <b><span /><span /><span /></b>
      <i />
    </span>
  );
}

function HeroCopy({ copy }: { copy: CopyMap }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="hv-copy"
      initial={reduce ? false : { opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hv-eyebrow">
        <strong>{copy["hero.eyebrow"]}</strong>
        <FolkDivider />
      </div>
      <h1><span>{copy["hero.title"]}</span><em>{copy["hero.titleAccent"]}</em></h1>
      <p>{copy["hero.lead"]}</p>
      <div className="hv-actions">
        <a className="hv-button hv-button-primary" href="/dolacz">{copy["hero.primaryCta"]} <ArrowRight size={18} weight="bold" /></a>
        <a className="hv-button hv-button-secondary" href="/zapros-halke">{copy["hero.secondaryCta"]}</a>
      </div>
      <dl className="hv-proof" aria-label={copy["hero.proofLabel"]}>
        <div><dt>{copy["hero.proof1Title"]}</dt><dd>{copy["hero.proof1Value"]}</dd></div>
        <div><dt>{copy["hero.proof2Title"]}</dt><dd>{copy["hero.proof2Value"]}</dd></div>
        <div><dt>{copy["hero.proof3Title"]}</dt><dd>{copy["hero.proof3Value"]}</dd></div>
      </dl>
    </motion.div>
  );
}

export function DanceHero({ copy }: { copy: CopyMap }) {
  const reduce = useReducedMotion();

  return (
    <section
      className="hv-hero"
      id="poczatek"
      aria-label={copy["hero.ariaLabel"]}
    >
      <HeroCopy copy={copy} />
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
            alt={copy["hero.imageAlt"]}
            width={2200}
            height={1467}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
        <figcaption className="hv-dance-caption">
          <span>{copy["hero.imageLabel"]}</span>
          <strong>{copy["hero.imageCaption"]}</strong>
        </figcaption>
      </motion.figure>
    </section>
  );
}

export function HeroVariants({ copy, shared }: { copy: CopyMap; shared: SharedContent }) {
  return (
    <main className="hero-variants-page">
      <ScrollRosettes />
      <header className="hv-header">
        <Link className="hv-brand" href="/" aria-label={copy["header.return"]}>
          <img src="/logo.jpg" alt="" width="44" height="44" />
          <span><strong>{copy["header.brand"]}</strong><small>{copy["header.city"]}</small></span>
        </Link>
        <p>{copy["header.label"]}</p>
        <Link className="hv-return" href="/"><ArrowLeft size={17} /> {copy["header.return"]}</Link>
      </header>
      <DanceHero copy={copy} />
      <section className="hv-after" aria-labelledby="hv-after-title">
        <div>
          <p>{copy["after.eyebrow"]}</p>
          <h2 id="hv-after-title">{copy["after.title"]}</h2>
          <span>{copy["after.lead"]}</span>
        </div>
        <div className="hv-after-points">
          <p><strong>{copy["after.point1Title"]}</strong> {copy["after.point1Text"]}</p>
          <p><strong>{copy["after.point2Title"]}</strong> {copy["after.point2Text"]}</p>
          <p><strong>{copy["after.point3Title"]}</strong> {copy["after.point3Text"]}</p>
        </div>
      </section>
      <SiteFooter shared={shared} />
    </main>
  );
}
