import type { CSSProperties } from "react";
import type { ThemeCssVariables, VisualThemeRow } from "./types";

export function themeToCssVariables(theme: VisualThemeRow): ThemeCssVariables {
  return {
    "--primary": theme.primary_color,
    "--secondary": theme.secondary_color,
    "--glow": theme.glow_color,
    "--background": theme.background_color,
    "--accent": theme.accent_color,
    "--glass": theme.glass_color,
    "--border-glow": theme.border_glow_color,
  };
}

export function cssVariablesToStyle(vars: ThemeCssVariables): CSSProperties {
  return vars as CSSProperties;
}
