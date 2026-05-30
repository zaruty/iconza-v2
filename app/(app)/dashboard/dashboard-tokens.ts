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

export type SolidIconSize = "small" | "md" | "lg";

/** Escala proporcional para SolidIcon3D (círculo + ícone interno). */
export const SOLID_ICON_DIMENSIONS: Record<SolidIconSize, { circle: number; icon: number }> = {
  small: { circle: 44, icon: 18 },
  md: { circle: 52, icon: 22 },
  lg: { circle: 60, icon: 24 },
};

/** Escurece um hex sólido para a base 3D (sem transparência). */
export function darkenHex(hex: string, factor = 0.78): string {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized.slice(0, 6);

  const channel = (start: number) =>
    Math.round(parseInt(value.slice(start, start + 2), 16) * factor)
      .toString(16)
      .padStart(2, "0");

  return `#${channel(0)}${channel(2)}${channel(4)}`;
}
