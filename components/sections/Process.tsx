"use client";

import { useRef } from "react";
import { process } from "@/lib/content";
import { STAGGER, drawRule, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Process.module.css";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current) : undefined;

    const grid = el.querySelector(`.${styles.grid}`) ?? el;
    revealOnScroll(`.${styles.step}`, grid, { stagger: STAGGER.wide });
    // Camada secundária: as réguas lime crescem depois que o passo já entrou.
    drawRule(`.${styles.when} .rule`, grid, 0.2);

    return () => revert?.();
  });

  return (
    <section
      className="shell section"
      id="como-trabalhamos"
      aria-labelledby="processo-titulo"
      ref={root}
    >
      <div className="section-head">
        <p className="eyebrow">Como trabalhamos</p>
        <span className="section-head-count">03 / 06</span>
      </div>

      <h2 className={styles.title} id="processo-titulo" ref={title}>
        {process.title}
      </h2>

      <div className={styles.grid}>
        {process.steps.map((step) => (
          <article className={styles.step} key={step.title}>
            <p className={styles.when}>
              <span className="rule rule-sm" aria-hidden="true" />
              {step.when}
            </p>
            <h3>{step.title}</h3>
            <p className={styles.desc}>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
