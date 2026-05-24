export type UniverseColorKey =
  | "iconmind"
  | "iconlove"
  | "iconethnia"
  | "iconfood"
  | "iconart";

export const UNIVERSE_COLORS: Record<
  UniverseColorKey,
  { accent: string; accentMuted: string }
> = {
  iconmind: {
    accent: "#7c8aa5",
    accentMuted: "rgba(124, 138, 165, 0.35)",
  },
  iconlove: {
    accent: "#f472b6",
    accentMuted: "rgba(244, 114, 182, 0.35)",
  },
  iconethnia: {
    accent: "#34d399",
    accentMuted: "rgba(52, 211, 153, 0.35)",
  },
  iconfood: {
    accent: "#fbbf24",
    accentMuted: "rgba(251, 191, 36, 0.35)",
  },
  iconart: {
    accent: "#60a5fa",
    accentMuted: "rgba(96, 165, 250, 0.35)",
  },
};

export function getUniverseColor(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accent;
  }
  return UNIVERSE_COLORS.iconmind.accent;
}

export function getUniverseColorMuted(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accentMuted;
  }
  return UNIVERSE_COLORS.iconmind.accentMuted;
}

export function isUniverseColorKey(id: string): id is UniverseColorKey {
  return id in UNIVERSE_COLORS;
}
