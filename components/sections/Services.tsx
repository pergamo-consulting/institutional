"use client";

import { useRef } from "react";
import { services } from "@/lib/content";
import { DUR, EASE, STAGGER, gsap, useMotion } from "@/lib/motion";
import styles from "./Services.module.css";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    // Cada linha tem o próprio trigger: a lista é longa e revelar tudo de uma
    // vez faria as últimas aparecerem antes de entrarem na tela.
    el.querySelectorAll<HTMLElement>(`.${styles.service}`).forEach((row) => {
      gsap.from(row.children, {
        autoAlpha: 0,
        y: 20,
        duration: DUR.slow,
        ease: EASE.out,
        stagger: STAGGER.base,
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });
    });
  });

  return (
    <section className="shell section" id="servicos" aria-labelledby="servicos-titulo" ref={root}>
      <div className="section-head">
        <h2 className="eyebrow" id="servicos-titulo">
          Serviços
        </h2>
        <span className="section-head-count">02 / 06</span>
      </div>

      {services.map((service) => (
        <article className={styles.service} key={service.num}>
          <p className={styles.num}>{service.num}</p>
          <div>
            <h3>{service.title}</h3>
            <p className={styles.desc}>{service.desc}</p>
          </div>
          <ul className={styles.tags}>
            {service.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
