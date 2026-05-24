export type AppNavColorKey =
  | "home"
  | "explore"
  | "universes"
  | "achievements"
  | "profile";

export const APP_NAV_COLORS: Record<AppNavColorKey, string> = {
  home: "#7c8aa5",
  explore: "#60a5fa",
  universes: "#34d399",
  achievements: "#fbbf24",
  profile: "#f472b6",
};

export function hrefToNavColorKey(href: string): AppNavColorKey {
  if (href === "/dashboard") return "home";
  if (href.startsWith("/explorar")) return "explore";
  if (href.startsWith("/universos")) return "universes";
  if (href.startsWith("/conquistas")) return "achievements";
  return "profile";
}
