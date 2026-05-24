"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminSession } from "@/app/lib/admin/session";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="admin-loading auth-viewport-min">
        <span className="admin-spinner admin-spinner--lg" aria-label="Carregando painel" />
      </div>
    );
  }

  return children;
}
