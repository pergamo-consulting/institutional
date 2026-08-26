import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Família única do site: inclusive nos rótulos e números.
// Auto-hospedada pelo Next: sem request a fonts.googleapis.com e sem CLS.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

// Exceção à família única: a marca do Clubber é escrita em Sora.
// Só o peso 700 entra, e só a marca usa.
const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-sora",
  display: "swap",
});

const title = "Pergamo Consulting | Consultoria e software sob medida em Curitiba";
const description =
  "Software para operação crítica: diagnóstico em 2 semanas, sistema rodando em 4. Quem senta na reunião com você é quem escreve o código, sem troca de time depois da assinatura.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/pergamo-mark.svg" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pergamo Consulting",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
