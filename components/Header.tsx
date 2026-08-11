"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { DUR, EASE, STAGGER, gsap, isFreshLoad, useMotion } from "@/lib/motion";
import styles from "./Header.module.css";

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  /* Sombra ao sair do topo. Fora do useMotion de propósito: não é movimento
     decorativo, é hierarquia — vale também para quem pediu motion reduzido. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Marca no menu a seção em que o usuário está. */
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const top = sections.find((section) => visible.has(section.id));
        setCurrent(top ? `#${top.id}` : null);
      },
      { rootMargin: "-78px 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Entrada no load: a barra se monta da esquerda para a direita.
  useMotion(root, () => {
    if (!isFreshLoad()) return;
    gsap.from(".js-header-item", {
      autoAlpha: 0,
      y: -10,
      duration: DUR.base,
      ease: EASE.out,
      stagger: STAGGER.base,
    });
  });

  return (
    <header
      id="topo"
      ref={root}
      className={`${styles.header} site-header ${stuck ? styles.stuck : ""}`}
    >
      <div className={`shell ${styles.inner}`}>
        <a className={`${styles.logo} js-header-item`} href="#topo" aria-label="Pergamo Consulting — início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pergamo-lockup-horizontal.svg" alt="Pergamo" width={249} height={41} />
        </a>

        <nav
          id="nav-principal"
          aria-label="Navegação principal"
          className={`${styles.nav} ${open ? styles.navOpen : ""} js-header-item`}
        >
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current === item.href ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className={`btn btn-sm btn-lime ${styles.cta} js-header-item`} href="#contato">
          Agendar diagnóstico
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-principal"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>
      </div>
    </header>
  );
}
