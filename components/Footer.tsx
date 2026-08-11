import { footer } from "@/lib/content";
import styles from "./Footer.module.css";

/* Server component: nada aqui precisa de JS no cliente. */
export default function Footer() {
  return (
    <footer className={`band-dark ${styles.footer}`}>
      <div className="shell">
        <div className={styles.top}>
          <div>
            <a className={styles.logo} href="#topo" aria-label="Pergamo Consulting — início">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pergamo-lockup-horizontal.svg" alt="Pergamo" width={249} height={41} />
            </a>
            <p className={styles.blurb}>{footer.blurb}</p>
          </div>

          {footer.columns.map((column) => {
            const id = `rodape-${column.title.toLowerCase()}`;
            return (
              <nav className={styles.col} aria-labelledby={id} key={column.title}>
                <h2 id={id}>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        rel={link.href.startsWith("http") ? "noopener" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className={styles.base}>
          <span>{footer.legal}</span>
          <span>{footer.registration}</span>
        </div>
      </div>
    </footer>
  );
}
