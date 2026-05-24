"use client";

import { useEffect, useState } from "react";
import type { AdminSession } from "@/app/lib/admin/types";
import { getAdminSession } from "@/app/lib/admin/session";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  if (!session) return null;

  return (
    <div className="admin-app auth-viewport-min">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main">
        <AdminHeader
          session={session}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
