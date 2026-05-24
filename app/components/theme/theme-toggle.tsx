"use client";

import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "@/app/lib/theme";

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
};

export function ThemeToggle({ theme, onToggle, className = "" }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
    >
      {isDark ? (
        <Sun className="theme-toggle__icon" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="theme-toggle__icon" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
