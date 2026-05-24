import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050a14",
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ICONZA — Crie ícones com IA",
  description:
    "Plataforma educacional para criar ícones com inteligência artificial. Explore universos criativos e aprenda design com IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable} ${poppins.variable} h-full bg-transparent antialiased`}
    >
      <body className="relative isolate min-h-full flex flex-col bg-iconza-bg font-sans text-iconza-pink">
        {children}
      </body>
    </html>
  );
}
