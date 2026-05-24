"use client";

import { SerwistProvider } from "@serwist/turbopack/react";

export function AppPwaProvider({ children }: { children: React.ReactNode }) {
  return <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>;
}
