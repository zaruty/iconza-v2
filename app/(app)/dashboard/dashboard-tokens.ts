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
