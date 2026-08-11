"use client";

import { useRef, useState } from "react";
import { contact } from "@/lib/content";
import { STAGGER, revealHeadline, revealOnScroll, useMotion } from "@/lib/motion";
import styles from "./Contact.module.css";

/**
 * Sem endpoint configurado o formulário entrega a mensagem ao cliente de
 * e-mail, para nunca virar beco sem saída. Defina NEXT_PUBLIC_CONTACT_ENDPOINT
 * para passar a fazer POST num handler real.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;

    const revert = title.current ? revealHeadline(title.current, { delay: 0.1 }) : undefined;
    revealOnScroll(`.${styles.lead}, .${styles.details} > div`, el, { y: 14 });
    revealOnScroll(`.${styles.form} > *`, el.querySelector(`.${styles.form}`) ?? el, {
      y: 14,
      stagger: STAGGER.tight,
    });

    return () => revert?.();
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!ENDPOINT) {
      const body = [
        `Nome: ${data.get("nome") ?? ""}`,
        `E-mail: ${data.get("email") ?? ""}`,
        `Empresa: ${data.get("empresa") ?? ""}`,
        "",
        "O que está travando hoje:",
        String(data.get("contexto") || "(não informado)"),
      ].join("\n");

      const subject = `Diagnóstico — ${data.get("empresa") || data.get("nome") || ""}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("Abrimos seu e-mail com a mensagem pronta. É só enviar.");
      return;
    }

    setSending(true);
    setStatus("Enviando…");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("Recebido. Retornamos em até 1 dia útil.");
    } catch {
      setStatus(`Não conseguimos enviar agora. Escreva para ${contact.email}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className={`band-lime ${styles.contact}`}
      id="contato"
      aria-labelledby="contato-titulo"
      ref={root}
    >
      <div className={`shell ${styles.grid}`}>
        <div>
          <span className={`eyebrow eyebrow-olive ${styles.eyebrow}`}>{contact.eyebrow}</span>
          <h2 className={styles.title} id="contato-titulo" ref={title}>
            {contact.title}
          </h2>
          <p className={styles.lead}>{contact.lead}</p>

          <dl className={styles.details}>
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={contact.whatsapp.href}>{contact.whatsapp.label}</a>
              </dd>
            </div>
            <div>
              <dt>Endereço</dt>
              <dd>{contact.address}</dd>
            </div>
          </dl>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" autoComplete="name" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail corporativo</label>
            <input type="email" id="email" name="email" autoComplete="email" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="empresa">Empresa</label>
            <input type="text" id="empresa" name="empresa" autoComplete="organization" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="contexto">O que está travando hoje?</label>
            <textarea id="contexto" name="contexto" rows={3} />
          </div>
          <button className="btn btn-ink" type="submit" disabled={sending}>
            Agendar diagnóstico
          </button>
          {status && (
            <p className={styles.status} role="status" aria-live="polite">
              {status}
            </p>
          )}
          <p className={styles.fineprint}>{contact.fineprint}</p>
        </form>
      </div>
    </section>
  );
}
