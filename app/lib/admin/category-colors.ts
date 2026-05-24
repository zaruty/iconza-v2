import type { AdminModuleCategory } from "./modules";

export type AdminCategoryColorKey = AdminModuleCategory | "overview";

export const ADMIN_CATEGORY_COLORS: Record<AdminCategoryColorKey, string> = {
  overview: "#ffffff",
  content: "#60a5fa",
  platform: "#34d399",
  business: "#fbbf24",
  people: "#f472b6",
};

export function getCategoryColor(category: AdminCategoryColorKey): string {
  return ADMIN_CATEGORY_COLORS[category];
}

export function sidebarSectionToCategory(
  sectionId: string,
): AdminCategoryColorKey {
  if (sectionId === "main") return "overview";
  if (sectionId in ADMIN_CATEGORY_COLORS) {
    return sectionId as AdminCategoryColorKey;
  }
  return "overview";
}
