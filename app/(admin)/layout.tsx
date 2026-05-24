import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — ICONZA",
  description: "Painel administrativo ICONZA",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin-root min-h-full">{children}</div>;
}
