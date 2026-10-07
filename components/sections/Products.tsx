"use client";

import { useRef, useState } from "react";
import { products } from "@/lib/content";
import { STAGGER, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Products.module.css";
import WaitlistDialog from "./WaitlistDialog";

export default function Products() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [openFor, setOpenFor] = useState<string | null>(null);
  /*
   * Quantos entraram nesta visita. O número de base vem do content.ts e é
   * mantido à mão; isto só soma o que aconteceu na frente do visitante, para
   * a contagem não ficar mentindo na tela logo depois de ele se inscrever.
   */
  const [joined, setJoined] = useState<Record<string, number>>({});

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current) : undefined;
    revealOnScroll(`.${styles.lead}, .${styles.item}`, el, { stagger: STAGGER.wide });

    return () => revert?.();
  });

  const count = (item: (typeof products.items)[number]) =>
    item.waitlist.count + (joined[item.name] ?? 0);

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
              <button
                className={styles.link}
                type="button"
                onClick={() => setOpenFor(item.name)}
              >
                <span>{item.cta.label}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </button>

              <p className={styles.count}>
                {count(item)} {count(item) === 1 ? item.waitlist.singular : item.waitlist.plural}
              </p>

              <WaitlistDialog
                open={openFor === item.name}
                copy={item.waitlist.form}
                product={item.name}
                onClose={() => setOpenFor(null)}
                onJoined={() =>
                  setJoined((prev) => ({ ...prev, [item.name]: (prev[item.name] ?? 0) + 1 }))
                }
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
