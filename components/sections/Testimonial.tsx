"use client";

import { useRef } from "react";
import { testimonial } from "@/lib/content";
import { drawRule, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Testimonial.module.css";

export default function Testimonial() {
  const root = useRef<HTMLElement>(null);
  const quote = useRef<HTMLQuoteElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    drawRule(`.${styles.rule}`, el);
    const revert = quote.current ? revealHeadline(quote.current, { delay: 0.15 }) : undefined;
    revealOnScroll(`.${styles.caption} > *`, el, { y: 14 });

    return () => revert?.();
  });

  return (
    <section className={`band-dark ${styles.band}`} aria-label="Depoimento de cliente" ref={root}>
      <figure className={`shell ${styles.inner}`}>
        <div>
          <span className={`rule ${styles.rule}`} aria-hidden="true" />
          <blockquote className={styles.quote} ref={quote}>
            “{testimonial.quote}”
          </blockquote>
        </div>
        <figcaption className={styles.caption}>
          {/* Substituir pelo retrato da pessoa. */}
          <span className={styles.avatar} aria-hidden="true" />
          <span className={styles.name}>{testimonial.name}</span>
          <span className={styles.role}>
            {testimonial.role}
            <br />
            {testimonial.company}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
