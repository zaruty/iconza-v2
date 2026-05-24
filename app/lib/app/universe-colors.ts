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
    accent: "#7A8FA8",
    accentMuted: "rgba(122, 143, 168, 0.32)",
  },
  iconlove: {
    accent: "#B87A84",
    accentMuted: "rgba(184, 122, 132, 0.32)",
  },
  iconethnia: {
    accent: "#5F9078",
    accentMuted: "rgba(95, 144, 120, 0.32)",
  },
  iconfood: {
    accent: "#B8895A",
    accentMuted: "rgba(184, 137, 90, 0.32)",
  },
  iconart: {
    accent: "#9B87B3",
    accentMuted: "rgba(155, 135, 179, 0.32)",
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
