import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// Auto-hospedadas pelo Next: sem request a fonts.googleapis.com e sem CLS.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Pergamo Consulting — Sistemas sob medida para operações que não podem parar";
const description =
  "Consultoria e software house. Entendemos a sua operação antes da primeira linha de código — e ficamos até o sistema rodar sozinho, em produção.";

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
    <html lang="pt-BR" className={`${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
