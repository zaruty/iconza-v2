import type { Metadata, Viewport } from "next";
import { AppPwaProvider } from "@/app/components/app/AppPwaProvider";
import { AppThemeProvider } from "@/app/components/app/app-theme-provider";
import { BottomNav } from "@/app/components/app/BottomNav";

export const metadata: Metadata = {
  applicationName: "ICONZA",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ICONZA",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: [{ url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F0EFEC",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppPwaProvider>
      <AppThemeProvider>
        <BottomNav />
        <main className="app-main">{children}</main>
      </AppThemeProvider>
    </AppPwaProvider>
  );
}
