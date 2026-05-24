"use client";

import { createContext, useContext } from "react";
import { useTheme, type ThemeMode } from "@/app/lib/theme";

type AdminThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminTheme must be used within AdminThemeProvider");
  return ctx;
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme("admin");

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="admin-root min-h-full" data-theme={theme}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}
