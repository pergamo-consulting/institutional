"use client";

import { useRef } from "react";
import { stats } from "@/lib/content";
import { countUp, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Stats.module.css";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    revealOnScroll(`.${styles.item}`, el, { y: 16 });

    // Os números contam até o valor final. O JSX já renderiza o valor final,
    // então o HTML estático continua correto para crawler e para quem não tem JS.
    el.querySelectorAll<HTMLElement>("[data-count-to]").forEach((node) => {
      const to = Number(node.dataset.countTo);
      const prefix = node.dataset.prefix ?? "";
      const suffix = node.dataset.suffix ?? "";
      countUp(node, to, el, (value) => `${prefix}${value}${suffix}`);
    });
  });

  return (
    <section className={styles.stats} aria-label="Pergamo em números" ref={root}>
      <div className="shell">
        <dl className={styles.grid}>
          {stats.map((stat) => (
            <div className={styles.item} key={stat.srLabel}>
              <dt className="visually-hidden">{stat.srLabel}</dt>
              <dd>
                <span
                  className={styles.value}
                  data-count-to={stat.to}
                  data-prefix={stat.prefix}
                  data-suffix={stat.suffix}
                >
                  {stat.prefix}
                  {stat.to}
                  {stat.suffix}
                </span>
                <span className={styles.label}>{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
