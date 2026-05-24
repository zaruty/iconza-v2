export type AppNavColorKey =
  | "home"
  | "explore"
  | "universes"
  | "achievements"
  | "profile";

/** Nav pigments aligned with illustrated universe palette */
export const APP_NAV_COLORS: Record<AppNavColorKey, string> = {
  home: "#6F8FB8",
  explore: "#D97832",
  universes: "#7A5CCF",
  achievements: "#E0A11B",
  profile: "#C26D8C",
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
