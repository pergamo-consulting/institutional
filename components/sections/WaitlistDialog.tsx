"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";
import styles from "./WaitlistDialog.module.css";

/**
 * Mesmo contrato do formulário de contato: sem endpoint configurado, o envio
 * cai no cliente de e-mail em vez de virar beco sem saída. Defina
 * NEXT_PUBLIC_WAITLIST_ENDPOINT para passar a fazer POST num handler real.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "";

type Copy = {
  title: string;
  lead: string;
  submit: string;
  fineprint: string;
  contextLabel: string;
  done: string;
};

export default function WaitlistDialog({
  open,
  copy,
  product,
  onClose,
  onJoined,
}: {
  open: boolean;
  copy: Copy;
  product: string;
  onClose: () => void;
  onJoined: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // showModal() é o que ativa foco preso e ::backdrop; `open` no HTML não ativa.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("produto", product);

    if (!ENDPOINT) {
      const body = [
        `Quero entrar na lista de espera do ${product}.`,
        "",
        `Nome: ${data.get("nome") ?? ""}`,
        `E-mail: ${data.get("email") ?? ""}`,
        `Empresa: ${data.get("empresa") ?? ""}`,
        "",
        "O que espera resolver:",
        String(data.get("contexto") || "(não informado)"),
      ].join("\n");

      const subject = `Lista de espera ${product} — ${data.get("empresa") || data.get("nome") || ""}`;
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
      setStatus(copy.done);
      // O contador só sobe depois do 2xx: número na tela é fato, não torcida.
      onJoined();
    } catch {
      setStatus(`Não conseguimos registrar agora. Escreva para ${contact.email}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog
      className={styles.dialog}
      ref={dialog}
      aria-labelledby="lista-espera-titulo"
      onClose={onClose}
      onCancel={onClose}
    >
      <div className={styles.head}>
        <h2 className={styles.title} id="lista-espera-titulo">
          {copy.title}
        </h2>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>
      </div>

      <p className={styles.lead}>{copy.lead}</p>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.field}>
          <label htmlFor="le-nome">Nome</label>
          <input type="text" id="le-nome" name="nome" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="le-email">E-mail corporativo</label>
          <input type="email" id="le-email" name="email" autoComplete="email" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="le-empresa">Empresa</label>
          <input
            type="text"
            id="le-empresa"
            name="empresa"
            autoComplete="organization"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="le-contexto">{copy.contextLabel}</label>
          <textarea id="le-contexto" name="contexto" rows={2} />
        </div>

        <button className="btn btn-ink" type="submit" disabled={sending}>
          {copy.submit}
        </button>
        {status && (
          <p className={styles.status} role="status" aria-live="polite">
            {status}
          </p>
        )}
        <p className={styles.fineprint}>{copy.fineprint}</p>
      </form>
    </dialog>
  );
}
