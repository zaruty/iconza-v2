import type { Metadata, Viewport } from "next";
import { AppPwaProvider } from "@/app/components/app/AppPwaProvider";
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
  themeColor: "#FAFAFA",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppPwaProvider>
      <div className="app-shell min-h-full">
        <BottomNav />
        <main className="app-main">{children}</main>
      </div>
    </AppPwaProvider>
  );
}
