"use client";

import { useRef } from "react";
import { whereWeFit } from "@/lib/content";
import { STAGGER, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./WhereWeFit.module.css";

export default function WhereWeFit() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;
    revealOnScroll(`.${styles.intro} > *`, el);
    revealOnScroll(`.${styles.symptom}`, el.querySelector(`.${styles.symptoms}`) ?? el, {
      stagger: STAGGER.wide,
    });
  });

  return (
    <section className="shell section" id="onde-entramos" aria-labelledby="fit-titulo" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Onde entramos</p>
        <span className="section-head-count">01 / 06</span>
      </div>

      <div className={styles.intro}>
        <h2 id="fit-titulo">{whereWeFit.title}</h2>
        <p>{whereWeFit.lead}</p>
      </div>

      <div className={styles.symptoms}>
        {whereWeFit.symptoms.map((symptom) => (
          <article className={styles.symptom} key={symptom.key}>
            <p className={styles.key}>{symptom.key}</p>
            <h3>{symptom.title}</h3>
            <p className={styles.desc}>{symptom.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
