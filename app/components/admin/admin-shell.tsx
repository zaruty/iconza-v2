"use client";

import { useEffect, useState } from "react";
import type { AdminSession } from "@/app/lib/admin/types";
import { getAdminSession } from "@/app/lib/admin/session";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";

const SIDEBAR_COLLAPSED_KEY = "iconza-admin-sidebar-collapsed";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setSession(getAdminSession());
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "true") setSidebarCollapsed(true);
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
