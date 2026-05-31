"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/app/components/app/BottomNav";
import { APP_BARE_ROUTES } from "@/app/lib/app/routes";

function isBareRoute(pathname: string) {
  return (APP_BARE_ROUTES as readonly string[]).includes(pathname);
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isBareRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <BottomNav />
      <main className="app-main">{children}</main>
    </>
  );
}
