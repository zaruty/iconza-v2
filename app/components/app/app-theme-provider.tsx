"use client";

import { createContext, useContext } from "react";
import { useTheme, type ThemeMode } from "@/app/lib/theme";

type AppThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme("app");

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app-shell min-h-full" data-theme={theme}>
        {children}
      </div>
    </AppThemeContext.Provider>
  );
}
