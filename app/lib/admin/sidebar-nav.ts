import type { AdminModuleCategory, AdminModuleIcon, AdminModuleStatus } from "./modules";
import { ADMIN_MODULES, ADMIN_MODULE_CATEGORIES } from "./modules";

export type AdminSidebarSubItem = {
  id: string;
  label: string;
  href: string;
  status?: AdminModuleStatus;
};

export type AdminSidebarNavItem = {
  id: string;
  label: string;
  href?: string;
  icon: AdminModuleIcon | "overview";
  status?: AdminModuleStatus;
  children?: AdminSidebarSubItem[];
};

export type AdminSidebarSection = {
  id: string;
  label: string;
  items: AdminSidebarNavItem[];
};

const CATEGORY_ICONS: Record<AdminModuleCategory, AdminModuleIcon> = {
  content: "lessons",
  platform: "uploads",
  business: "analytics",
  people: "users",
};

const CATEGORY_ORDER: AdminModuleCategory[] = [
  "content",
  "platform",
  "business",
  "people",
];

function modulesByCategory(category: AdminModuleCategory): AdminSidebarSubItem[] {
  return ADMIN_MODULES.filter((m) => m.category === category).map((m) => ({
    id: m.id,
    label: m.title,
    href: m.href,
    status: m.status,
  }));
}

export const ADMIN_SIDEBAR_SECTIONS: AdminSidebarSection[] = [
  {
    id: "main",
    label: "PRINCIPAL",
    items: [
      {
        id: "overview",
        label: "Visão geral",
        href: "/admin/dashboard",
        icon: "overview",
      },
    ],
  },
  ...CATEGORY_ORDER.map((category) => ({
    id: category,
    label: ADMIN_MODULE_CATEGORIES[category].label.toUpperCase(),
    items: [
      {
        id: `${category}-group`,
        label: ADMIN_MODULE_CATEGORIES[category].label,
        icon: CATEGORY_ICONS[category],
        children: modulesByCategory(category),
      },
    ],
  })),
];

export function isNavItemActive(pathname: string, href: string) {
  if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavGroupActive(pathname: string, children: AdminSidebarSubItem[]) {
  return children.some((child) => isNavItemActive(pathname, child.href));
}
