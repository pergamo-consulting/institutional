"use client";

import { useRef } from "react";
import { hero } from "@/lib/content";
import { DUR, EASE, STAGGER, gsap, isFreshLoad, revealHeadline, useMotion } from "@/lib/motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useMotion(root, () => {
    // Hidratação lenta = hero já visto. Reanimar agora seria uma piscada.
    if (!isFreshLoad()) return;

    // A headline tem timeline própria: `autoSplit` pode refazer a divisão
    // quando a fonte carrega, e isso não pode rebobinar o resto da página.
    const revert = title.current ? revealHeadline(title.current, { delay: 0.15, scroll: false }) : undefined;

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });

    tl.from(".js-hero-rule", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: DUR.base,
    })
      .from(".js-hero-eyebrow", { autoAlpha: 0, x: -8, duration: DUR.base }, "-=0.25")
      // Alinhado com a headline, que começa em 0.15s e dura 0.6s.
      .from(".js-hero-lead", { autoAlpha: 0, y: 16, duration: DUR.slow }, 0.55)
      .from(
        ".js-hero-action",
        { autoAlpha: 0, y: 14, duration: DUR.base, stagger: STAGGER.base },
        "-=0.35"
      )
      .from(".js-hero-trust", { autoAlpha: 0, duration: DUR.base }, "-=0.2")
      // Trilho da direita entra deslocado e por último: hierarquia clara.
      .from(
        ".js-hero-rail",
        { autoAlpha: 0, x: 18, duration: DUR.base, stagger: STAGGER.tight },
        "-=0.75"
      )
      .from(".js-hero-note", { autoAlpha: 0, y: 12, duration: DUR.base }, "-=0.15");

    return () => revert?.();
  });

  return (
    <section className="band-dark" aria-labelledby="hero-titulo" ref={root}>
      <div className={`shell ${styles.hero}`}>
        <div>
          <p className={styles.flag}>
            <span className="rule js-hero-rule" aria-hidden="true" />
            <span className="eyebrow eyebrow-dim js-hero-eyebrow">{hero.eyebrow}</span>
          </p>

          <h1 className={styles.title} id="hero-titulo" ref={title}>
            {hero.title}
          </h1>

          <p className={`${styles.lead} js-hero-lead`}>{hero.lead}</p>

          <div className={`btn-row ${styles.actions}`}>
            <a className="btn btn-lime js-hero-action" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="btn btn-ghost-dark js-hero-action" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className={`${styles.trust} js-hero-trust`}>
            <span className={styles.trustLabel}>{hero.trustLabel}</span>
            <div className={styles.trustMarks} role="img" aria-label="Logotipos de clientes">
              {hero.trustMarks.map((width, i) => (
                <span key={i} style={{ width }} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className={`${styles.indexLabel} js-hero-rail`}>{hero.indexLabel}</h2>
          <ul className={styles.index}>
            {hero.index.map((entry) => (
              <li key={entry.num}>
                <a className={`${styles.item} js-hero-rail`} href="#servicos">
                  <span className={styles.num}>{entry.num}</span>
                  <span className={styles.name}>{entry.name}</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={`${styles.note} js-hero-note`}>{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
