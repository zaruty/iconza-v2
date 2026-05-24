export type AppNavColorKey =
  | "home"
  | "explore"
  | "universes"
  | "achievements"
  | "profile";

/** Premium editorial pigments — calm, not neon */
export const APP_NAV_COLORS: Record<AppNavColorKey, string> = {
  home: "#7A8FA8",
  explore: "#9B87B3",
  universes: "#5F9078",
  achievements: "#B8895A",
  profile: "#B87A84",
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
