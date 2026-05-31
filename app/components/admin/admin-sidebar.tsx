"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { AdminModuleStatus } from "@/app/lib/admin/modules";
import {
  ADMIN_SIDEBAR_SECTIONS,
  isNavGroupActive,
  isNavItemActive,
  type AdminSidebarNavItem,
  type AdminSidebarSubItem,
} from "@/app/lib/admin/sidebar-nav";
import { ADMIN_ROUTES, HOME } from "@/app/lib/admin/routes";
import type { AdminCategoryColorKey } from "@/app/lib/admin/category-colors";
import { sidebarSectionToCategory } from "@/app/lib/admin/category-colors";
import { AdminNavIcon } from "./admin-icons";

type AdminSidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

function NavStatus({ status }: { status?: AdminModuleStatus }) {
  if (status !== "coming-soon") return null;
  return <span className="admin-nav__badge">Em breve</span>;
}

function SidebarLink({
  href,
  label,
  icon,
  active,
  disabled,
  collapsed,
  status,
  sub = false,
  category,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: AdminSidebarNavItem["icon"];
  active: boolean;
  disabled?: boolean;
  collapsed: boolean;
  status?: AdminModuleStatus;
  sub?: boolean;
  category: AdminCategoryColorKey;
  onNavigate: () => void;
}) {
  const className = [
    "admin-nav__link",
    active ? "is-active" : "",
    disabled ? "is-disabled" : "",
    sub ? "admin-nav__link--sub" : "",
    collapsed ? "admin-nav__link--collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={disabled ? ADMIN_ROUTES.dashboard : href}
      className={className}
      data-category={category}
      aria-current={active ? "page" : undefined}
      data-tooltip={collapsed ? label : undefined}
      onClick={onNavigate}
    >
      {icon ? <AdminNavIcon name={icon} className="admin-nav__icon" /> : null}
      {!collapsed ? (
        <>
          <span className="admin-nav__label">{label}</span>
          <NavStatus status={status} />
        </>
      ) : null}
    </Link>
  );
}

type NavGroupProps = {
  item: AdminSidebarNavItem;
  category: AdminCategoryColorKey;
  collapsed: boolean;
  pathname: string;
  onNavigate: () => void;
  onExpandFromCollapsed: () => void;
};

function NavGroup({
  item,
  category,
  collapsed,
  pathname,
  onNavigate,
  onExpandFromCollapsed,
}: NavGroupProps) {
  const children = item.children ?? [];
  const groupActive = isNavGroupActive(pathname, children);
  const [expanded, setExpanded] = useState(groupActive);

  useEffect(() => {
    if (groupActive) setExpanded(true);
  }, [groupActive]);

  if (!item.children?.length) return null;

  return (
    <div className={`admin-nav__group ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className={`admin-nav__link admin-nav__link--group ${groupActive ? "is-active" : ""} ${collapsed ? "admin-nav__link--collapsed" : ""}`}
        data-category={category}
        onClick={() => {
          if (collapsed) {
            onExpandFromCollapsed();
            return;
          }
          setExpanded((v) => !v);
        }}
        data-tooltip={collapsed ? item.label : undefined}
        aria-expanded={expanded}
      >
        <AdminNavIcon name={item.icon} className="admin-nav__icon" />
        {!collapsed ? (
          <>
            <span className="admin-nav__label">{item.label}</span>
            <ChevronDown className="admin-nav__chevron" aria-hidden />
          </>
        ) : null}
      </button>

      {!collapsed && expanded ? (
        <div className="admin-nav__sublist">
          {children.map((child) => (
            <SubLink
              key={child.id}
              child={child}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SubLink({
  child,
  pathname,
  onNavigate,
}: {
  child: AdminSidebarSubItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavItemActive(pathname, child.href);
  const disabled = child.status === "coming-soon";

  return (
    <Link
      href={disabled ? ADMIN_ROUTES.dashboard : child.href}
      className={`admin-nav__sublink ${active ? "is-active" : ""} ${disabled ? "is-disabled" : ""}`}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      <span className="admin-nav__sublink-label">{child.label}</span>
      <NavStatus status={child.status} />
    </Link>
  );
}

export function AdminSidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`admin-sidebar-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`admin-sidebar ${open ? "is-open" : ""} ${collapsed ? "is-collapsed" : ""}`}
        aria-label="Navegação administrativa"
      >
        <div className="admin-sidebar__head">
          <Link
            href={ADMIN_ROUTES.dashboard}
            className={`admin-brand admin-brand--compact ${collapsed ? "admin-brand--icon-only" : ""}`}
            onClick={onClose}
          >
            <span className="admin-brand__mark" aria-hidden />
            {!collapsed ? (
              <div>
              <span className="admin-brand__text font-subtitle">ICONZA</span>
              <span className="admin-brand__sub font-subtitle">Admin</span>
              </div>
            ) : null}
          </Link>

          <button
            type="button"
            className="admin-sidebar__collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
            title={collapsed ? "Expandir" : "Recolher"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>

        <nav className="admin-nav">
          {ADMIN_SIDEBAR_SECTIONS.map((section) => {
            const category = sidebarSectionToCategory(section.id);

            return (
            <div key={section.id} className="admin-nav__section">
              {!collapsed ? (
                <p className="admin-nav__section-label font-subtitle">{section.label}</p>
              ) : null}

              {section.items.map((item) => {
                if (item.children?.length) {
                  return (
                    <NavGroup
                      key={item.id}
                      item={item}
                      category={category}
                      collapsed={collapsed}
                      pathname={pathname}
                      onNavigate={onClose}
                      onExpandFromCollapsed={() => {
                        onToggleCollapse();
                      }}
                    />
                  );
                }

                const active = item.href ? isNavItemActive(pathname, item.href) : false;
                const disabled = item.status === "coming-soon";

                return (
                  <SidebarLink
                    key={item.id}
                    href={item.href ?? ADMIN_ROUTES.dashboard}
                    label={item.label}
                    icon={item.icon}
                    active={active}
                    disabled={disabled}
                    collapsed={collapsed}
                    status={item.status}
                    category={category}
                    onNavigate={onClose}
                  />
                );
              })}
            </div>
            );
          })}
        </nav>

        {!collapsed ? (
          <div className="admin-sidebar__foot font-subtitle">
            <p>
              Experiência do usuário separada em{" "}
              <Link href={HOME}>iconza.com</Link>
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
