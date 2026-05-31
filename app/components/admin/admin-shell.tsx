"use client";

import { useEffect, useState } from "react";
import type { AdminUser } from "@/app/lib/admin/types";
import { getAdminClientUser } from "@/app/lib/admin/supabase-auth";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";

const SIDEBAR_COLLAPSED_KEY = "iconza-admin-sidebar-collapsed";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      const adminUser = await getAdminClientUser();
      if (!cancelled) setSession(adminUser);
    }

    void loadSession();

    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "true") setSidebarCollapsed(true);

    return () => {
      cancelled = true;
    };
  }, []);

  function handleToggleCollapse() {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  }

  if (!session) return null;

  return (
    <div
      className={`admin-app auth-viewport-min ${sidebarCollapsed ? "admin-app--sidebar-collapsed" : ""}`}
    >
      <AdminSidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={handleToggleCollapse}
      />

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
