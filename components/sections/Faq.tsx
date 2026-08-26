"use client";

import { useRef } from "react";
import { faq } from "@/lib/content";
import { STAGGER, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Faq.module.css";

// Resposta em texto puro no HTML: o mesmo conteúdo serve leitor, buscador e LLM.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current) : undefined;

    const grid = el.querySelector(`.${styles.grid}`) ?? el;
    revealOnScroll(`.${styles.item}`, grid, { stagger: STAGGER.tight });

    return () => revert?.();
  });

  return (
    <section className="shell section" id="duvidas" aria-labelledby="duvidas-titulo" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Dúvidas</p>
        <span className="section-head-count">06 / 07</span>
      </div>

      <h2 className={styles.title} id="duvidas-titulo" ref={title}>
        {faq.title}
      </h2>

      <dl className={styles.grid}>
        {faq.items.map((item) => (
          <div className={styles.item} key={item.q}>
            <dt className={styles.q}>{item.q}</dt>
            <dd className={styles.a}>{item.a}</dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
