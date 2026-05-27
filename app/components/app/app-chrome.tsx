"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/app/components/app/BottomNav";

const BARE_ROUTES = ["/onboarding", "/onboarding/step/2"] as const;

function isBareRoute(pathname: string) {
  return (BARE_ROUTES as readonly string[]).includes(pathname);
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
