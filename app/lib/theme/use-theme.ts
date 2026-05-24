"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { getStoredTheme, getThemeColor, setStoredTheme } from "./storage";
import { THEME_DEFAULTS, type ThemeMode, type ThemeScope } from "./types";

function applyThemeMeta(scope: ThemeScope, theme: ThemeMode) {
  const color = getThemeColor(scope, theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", color);
}

export function useTheme(scope: ThemeScope) {
  const [theme, setThemeState] = useState<ThemeMode>(THEME_DEFAULTS[scope]);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const stored = getStoredTheme(scope);
    setThemeState(stored);
    setReady(true);
    if (scope === "app") applyThemeMeta(scope, stored);
  }, [scope]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setThemeState(next);
      setStoredTheme(scope, next);
      if (scope === "app") applyThemeMeta(scope, next);
    },
    [scope],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      setStoredTheme(scope, next);
      if (scope === "app") applyThemeMeta(scope, next);
      return next;
    });
  }, [scope]);

  return { theme, setTheme, toggleTheme, ready };
}
