export const T = {
  bg: "#EDEDF2",
  bgD: "#0E0E10",
  card: "#FFFFFF",
  cardD: "#141518",
  b: "rgba(0,0,0,0.06)",
  bD: "rgba(255,255,255,0.05)",
  sidebar: "rgba(255,255,255,0.88)",
  sidebarD: "rgba(14,14,16,0.95)",
  t1: "#0F0F0F",
  t1d: "#FFFFFF",
  t2: "#5A5A5A",
  t2d: "#94a3b8",
  t3: "#A0A0A0",
  t3d: "#64748b",
  acc: "#7A5CCF",
} as const;

export const c1 = (d: boolean): string => (d ? T.t1d : T.t1);
export const c2 = (d: boolean): string => (d ? T.t2d : T.t2);
export const c3 = (d: boolean): string => (d ? T.t3d : T.t3);
export const cd = (d: boolean): string => (d ? T.cardD : T.card);
export const cb = (d: boolean): string => (d ? T.bD : "transparent");

/** Opacidades base do vidro premium (lente, borda, reflexo, tinte). */
export const GLASS_OPACITY = {
  lens: { light: 0.52, dark: 0.1, lightFlat: 0.62, darkFlat: 0.14 },
  border: { light: 0.62, dark: 0.14, lightFlat: 0.45, darkFlat: 0.1 },
  highlight: { idle: 0.28, active: 0.42 },
  tint: { idle: 0.12, active: 0.28 },
  shadow: { flat: 0.22, raised: 0.38, raisedGlow: 0.55 },
} as const;

export type GlassDepth = "flat" | "raised";
export type GlassSize = "sm" | "md" | "lg";

export type GlassSurfaceTokens = {
  lensBg: string;
  lensGradient: string;
  border: string;
  highlight: string;
  tint: string;
  shadowFlat: string;
  shadowRaised: string;
  plate: string;
  iconColor: string;
  iconColorMuted: string;
};

/** Converte #RRGGBB em #RRGGBBAA. */
export function hexAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized.slice(0, 6);
  const channel = Math.min(255, Math.max(0, Math.round(alpha * 255)))
    .toString(16)
    .padStart(2, "0");
  return `#${value}${channel}`;
}

export function getGlassTokens(
  isDark: boolean,
  accentColor: string,
  isActive: boolean,
  depth: GlassDepth = "raised",
): GlassSurfaceTokens {
  const flat = depth === "flat";
  const o = GLASS_OPACITY;

  const lensAlpha = isDark
    ? flat
      ? o.lens.darkFlat
      : o.lens.dark
    : flat
      ? o.lens.lightFlat
      : o.lens.light;

  const borderAlpha = isDark
    ? flat
      ? o.border.darkFlat
      : o.border.dark
    : flat
      ? o.border.lightFlat
      : o.border.light;

  const tintAlpha = isActive ? o.tint.active : o.tint.idle;
  const highlightAlpha = isActive ? o.highlight.active : o.highlight.idle;

  const lensBg = isDark
    ? `rgba(255,255,255,${lensAlpha})`
    : `rgba(255,255,255,${lensAlpha})`;

  const cardWash = isDark ? "rgba(20,21,24,0.18)" : "rgba(255,255,255,0.08)";
  const tint = hexAlpha(accentColor, tintAlpha);

  return {
    lensBg,
    lensGradient: `linear-gradient(145deg, rgba(255,255,255,${highlightAlpha}) 0%, ${tint} 38%, ${lensBg} 100%)`,
    border: isDark
      ? `rgba(255,255,255,${borderAlpha})`
      : `rgba(255,255,255,${borderAlpha})`,
    highlight: `rgba(255,255,255,${highlightAlpha})`,
    tint,
    shadowFlat: `0 2px 8px ${hexAlpha(accentColor, o.shadow.flat)}, inset 0 1px 0 rgba(255,255,255,${isDark ? 0.12 : 0.35})`,
    shadowRaised: `0 6px 18px ${hexAlpha(accentColor, o.shadow.raisedGlow)}, 0 2px 6px rgba(0,0,0,${isDark ? 0.28 : 0.1}), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.18 : 0.4})`,
    plate: hexAlpha(accentColor, isActive ? 0.32 : 0.18),
    iconColor: isActive
      ? accentColor
      : isDark
        ? "rgba(255,255,255,0.72)"
        : "rgba(15,15,15,0.72)",
    iconColorMuted: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,15,15,0.5)",
  };
}

export const GLASS_SIZE_PX: Record<GlassSize, number> = {
  sm: 28,
  md: 32,
  lg: 40,
};

export const GLASS_ICON_SIZE: Record<GlassSize, number> = {
  sm: 16,
  md: 18,
  lg: 22,
};
