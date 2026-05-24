import type { Metadata } from "next";
import { AdminThemeProvider } from "@/app/components/admin/admin-theme-provider";

export const metadata: Metadata = {
  title: "Admin — ICONZA",
  description: "Painel administrativo ICONZA",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminThemeProvider>{children}</AdminThemeProvider>;
}
