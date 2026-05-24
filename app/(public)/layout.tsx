import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050a14",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ICONZA — Crie ícones com IA",
  description:
    "Plataforma educacional para criar ícones com inteligência artificial. Explore universos criativos e aprenda design com IA.",
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="public-root relative min-h-full bg-iconza-bg font-sans text-iconza-pink">
      {children}
    </div>
  );
}
