"use client";

import { useRef } from "react";
import { about } from "@/lib/content";
import { parallax, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./About.module.css";

export default function About() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current, { delay: 0.1 }) : undefined;
    revealOnScroll(`.${styles.copy} p, .${styles.stat}`, el);

    const layer = photo.current?.querySelector(".photo-layer");
    if (layer && photo.current) parallax(layer, photo.current, 10);

    return () => revert?.();
  });

  return (
    <section className="shell section" id="sobre" aria-labelledby="sobre-titulo" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Quem somos</p>
        <span className="section-head-count">05 / 06</span>
      </div>

      <div className={styles.grid}>
        {/* Substituir por foto P&B do time. */}
        <div className={`photo ${styles.photo}`} aria-hidden="true" ref={photo}>
          <span className="photo-layer" />
          <span>FOTO DO TIME — P&amp;B</span>
        </div>

        <div>
          <h2 className={styles.title} id="sobre-titulo" ref={title}>
            {about.title}
          </h2>

          <div className={styles.copy}>
            {about.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <dl className={styles.stats}>
            {about.stats.map((stat) => (
              <div className={styles.stat} key={stat.srLabel}>
                <dt className="visually-hidden">{stat.srLabel}</dt>
                <dd>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
