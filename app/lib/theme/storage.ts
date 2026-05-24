import {
  THEME_DEFAULTS,
  THEME_STORAGE_KEYS,
  type ThemeMode,
  type ThemeScope,
} from "./types";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function getStoredTheme(scope: ThemeScope): ThemeMode {
  if (typeof window === "undefined") {
    return THEME_DEFAULTS[scope];
  }

  const raw = localStorage.getItem(THEME_STORAGE_KEYS[scope]);
  return isThemeMode(raw) ? raw : THEME_DEFAULTS[scope];
}

export function setStoredTheme(scope: ThemeScope, theme: ThemeMode) {
  localStorage.setItem(THEME_STORAGE_KEYS[scope], theme);
}

export function getThemeColor(scope: ThemeScope, theme: ThemeMode): string {
  if (scope === "app") {
    return theme === "light" ? "#FAFAFA" : "#0a1228";
  }
  return theme === "light" ? "#F5F5F4" : "#0f0f11";
}
