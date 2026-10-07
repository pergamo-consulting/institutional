"use client";

import { useRef } from "react";
import { cases } from "@/lib/content";
import { STAGGER, parallax, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Cases.module.css";

export default function Cases() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const grid = el.querySelector(`.${styles.grid}`) ?? el;
    revealOnScroll(`.${styles.case}`, grid, { stagger: STAGGER.wide });

    // Camada ambiente: paralaxe só dentro do bloco de foto, que tem overflow
    // escondido. Nunca no texto — atrapalha a leitura.
    el.querySelectorAll<HTMLElement>(`.${styles.photo}`).forEach((frame) => {
      const layer = frame.querySelector(".photo-img");
      if (layer) parallax(layer, frame, 10);
    });
  });

  return (
    <section className="shell section" id="casos" aria-labelledby="casos-titulo" ref={root}>
      <div className="section-head">
        <h2 className="eyebrow" id="casos-titulo">
          Casos
        </h2>
        <span className="section-head-count">04 / 08</span>
      </div>

      <div className={styles.grid}>
        {cases.map((item) => (
          <article className={styles.case} key={item.sector}>
            <div className={`photo ${styles.photo}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="photo-img" src={item.image} alt={item.imageAlt} loading="lazy" />
            </div>
            <p className={styles.sector}>{item.sector}</p>
            <p className={styles.metric}>{item.metric}</p>
            <p className={styles.body}>{item.body}</p>
            <a className={styles.link} href={item.href}>
              {/* Não existe página de caso: o link leva à conversa, e o rótulo diz isso. */}
              <span>Conversar sobre isso</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
