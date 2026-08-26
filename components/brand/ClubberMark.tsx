import styles from "./ClubberMark.module.css";

/**
 * Marca do Clubber montada em DOM, não em imagem: fica nítida em qualquer
 * densidade de tela e o fundo é transparente de verdade. A geometria do
 * símbolo é a mesma dos SVGs oficiais da identidade deles.
 */
export default function ClubberMark({ size = 13 }: { size?: number }) {
  return (
    <span className={styles.pill} style={{ fontSize: size }} role="img" aria-label="Clubber">
      <span aria-hidden="true">clu</span>
      <span className={styles.disc} aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <rect x="27" y="16" width="13" height="64" rx="6.5" fill="#FFFFFF" />
          <circle cx="55" cy="60.5" r="15.5" fill="none" stroke="#FFFFFF" strokeWidth="12" />
          <path d="M61 77 Q69 86 81 88 Q75 80 74 68 Q69 74.5 61 77 Z" fill="#FFFFFF" />
        </svg>
      </span>
      <span aria-hidden="true">ber</span>
    </span>
  );
}
