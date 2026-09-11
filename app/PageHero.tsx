import type { CSSProperties, ReactNode } from "react";
import "./page-hero.css";

type PageHeroProps = {
  id?: string;
  titleId: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
  image: {
    src: string;
    srcSet?: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
    fit?: "cover" | "contain";
  };
  note?: ReactNode;
  noteLabel?: string;
  extra?: ReactNode;
};

export function PageHero({ id, titleId, eyebrow, title, lead, actions, image, note, noteLabel, extra }: PageHeroProps) {
  const imageStyle = {
    "--page-hero-image-position": image.position ?? "50% 42%",
    "--page-hero-image-fit": image.fit ?? "cover",
  } as CSSProperties;

  return (
    <section id={id} className="page-hero-outer-wrapper" aria-labelledby={titleId}>
      <div className='page-hero'>
        <div className="page-hero-copy">
          <p className="page-hero-eyebrow"><span>{eyebrow}</span><i aria-hidden="true" /></p>
          <h1 id={titleId}>{title}</h1>
          <p className="page-hero-lead">{lead}</p>
          {actions && <div className="page-hero-actions">{actions}</div>}
          {extra && <div className="page-hero-extra">{extra}</div>}
        </div>
        <figure className="page-hero-photo" style={imageStyle}>
          <img src={image.src} srcSet={image.srcSet} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) calc(100vw - 32px), 55vw" fetchPriority="high" decoding="async" />
        </figure>
        {note && <aside className="page-hero-note" aria-label={noteLabel}>{note}</aside>}
      </div>
    </section>
  );
}
