import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Família única do site — inclusive nos rótulos e números.
// Auto-hospedada pelo Next: sem request a fonts.googleapis.com e sem CLS.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const title = "Pergamo Consulting — Software feito por quem entendeu a sua operação primeiro";
const description =
  "Consultoria e software house. Diagnóstico, arquitetura, código e sustentação — o mesmo time do primeiro dia ao plantão.";

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
    <html lang="pt-BR" className={grotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
