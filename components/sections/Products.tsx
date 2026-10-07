"use client";

import { useRef } from "react";
import { products } from "@/lib/content";
import { STAGGER, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Products.module.css";

export default function Products() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current) : undefined;
    revealOnScroll(`.${styles.lead}, .${styles.item}`, el, { stagger: STAGGER.wide });

    return () => revert?.();
  });

  return (
    <section className="shell section" id="produtos" aria-labelledby="produtos-titulo" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Produtos</p>
        <span className="section-head-count">05 / 08</span>
      </div>

      <div className={styles.head}>
        <h2 className={styles.title} id="produtos-titulo" ref={title}>
          {products.title}
        </h2>
        <p className={styles.lead}>{products.lead}</p>
      </div>

      <div className={styles.list}>
        {products.items.map((item) => (
          <article className={styles.item} key={item.name}>
            <div>
              <h3 className={styles.name}>
                {item.name}
                <span className={styles.byline}>{item.byline}</span>
              </h3>
              <p className={styles.kind}>{item.kind}</p>
            </div>

            <div>
              <p className={styles.status}>
                <span className={styles.dot} aria-hidden="true" />
                {item.status}
              </p>
              <p className={styles.desc}>{item.desc}</p>
              <a className={styles.link} href={item.cta.href}>
                <span>{item.cta.label}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <p className={styles.count}>
                {item.waitlist.count}{" "}
                {item.waitlist.count === 1 ? item.waitlist.singular : item.waitlist.plural}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
