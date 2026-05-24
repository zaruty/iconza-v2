export type ThemeMode = "light" | "dark";

export type ThemeScope = "app" | "admin";

export const THEME_STORAGE_KEYS: Record<ThemeScope, string> = {
  app: "iconza-theme-app",
  admin: "iconza-theme-admin",
};

export const THEME_DEFAULTS: Record<ThemeScope, ThemeMode> = {
  app: "light",
  admin: "dark",
};
