"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminModuleStatus } from "@/app/lib/admin/modules";
import { ADMIN_NAV_ITEMS } from "@/app/lib/admin/modules";
import { AdminNavIcon } from "./admin-icons";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

function NavStatus({ status }: { status?: AdminModuleStatus }) {
  if (status !== "coming-soon") return null;
  return <span className="admin-nav__badge">Em breve</span>;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`admin-sidebar-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`admin-sidebar ${open ? "is-open" : ""}`}
        aria-label="Navegação administrativa"
      >
        <div className="admin-sidebar__head">
          <Link href="/admin/dashboard" className="admin-brand admin-brand--compact" onClick={onClose}>
            <span className="admin-brand__mark" aria-hidden />
            <div>
              <span className="admin-brand__text font-display">ICONZA</span>
              <span className="admin-brand__sub font-subtitle">Admin</span>
            </div>
          </Link>
        </div>

        <nav className="admin-nav">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);

            const isDisabled = "status" in item && item.status === "coming-soon";

            return (
              <Link
                key={item.id}
                href={isDisabled ? "/admin/dashboard" : item.href}
                className={`admin-nav__link ${active ? "is-active" : ""} ${isDisabled ? "is-disabled" : ""}`}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
              >
                <AdminNavIcon name={item.icon} className="admin-nav__icon" />
                <span className="admin-nav__label">{item.label}</span>
                {"status" in item ? <NavStatus status={item.status} /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__foot font-subtitle">
          <p>Experiência do usuário separada em <Link href="/">iconza.com</Link></p>
        </div>
      </aside>
    </>
  );
}
