"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminSession } from "@/app/lib/admin/types";
import { signOutAdmin } from "@/app/lib/admin/mock-auth";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { useAdminTheme } from "./admin-theme-provider";
import { AdminIconMenu } from "./admin-icons";

type AdminHeaderProps = {
  session: AdminSession;
  onMenuOpen: () => void;
};

export function AdminHeader({ session, onMenuOpen }: AdminHeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOutAdmin();
    router.replace("/admin/login");
  }

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <button
          type="button"
          className="admin-icon-btn admin-header__menu"
          onClick={onMenuOpen}
          aria-label="Abrir menu"
        >
          <AdminIconMenu className="h-5 w-5" />
        </button>
        <div>
          <p className="admin-header__eyebrow font-subtitle">Painel administrativo</p>
          <h1 className="admin-header__title font-display">Dashboard</h1>
        </div>
      </div>

      <div className="admin-header__right">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div className="admin-user-chip">
          <span className="admin-user-chip__avatar" aria-hidden>
            {session.user.name.charAt(0).toUpperCase()}
          </span>
          <div className="admin-user-chip__meta">
            <span className="admin-user-chip__name font-subtitle">{session.user.name}</span>
            <span className="admin-user-chip__role font-subtitle">{session.user.role}</span>
          </div>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? "Saindo..." : "Sair"}
        </button>
      </div>
    </header>
  );
}
