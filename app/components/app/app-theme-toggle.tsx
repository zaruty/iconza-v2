"use client";

import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { useAppTheme } from "./app-theme-provider";

export function AppThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();
  return <ThemeToggle theme={theme} onToggle={toggleTheme} className="app-theme-toggle" />;
}
