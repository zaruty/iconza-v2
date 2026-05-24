export type AppNavColorKey =
  | "home"
  | "explore"
  | "universes"
  | "achievements"
  | "profile";

/** Editorial nav pigments — filled, not neon */
export const APP_NAV_COLORS: Record<AppNavColorKey, string> = {
  home: "#5C7294",
  explore: "#7E6A9E",
  universes: "#4A8569",
  achievements: "#A87248",
  profile: "#A85F6B",
};

export function hrefToNavColorKey(href: string): AppNavColorKey {
  if (href === "/dashboard") return "home";
  if (href.startsWith("/explorar")) return "explore";
  if (href.startsWith("/universos")) return "universes";
  if (href.startsWith("/conquistas")) return "achievements";
  return "profile";
}

export function getNavColor(href: string): string {
  return APP_NAV_COLORS[hrefToNavColorKey(href)];
}
