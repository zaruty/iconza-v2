export type UniverseColorKey =
  | "iconmind"
  | "iconlove"
  | "iconetnia"
  | "iconfood"
  | "iconart";

export type UniverseColorSet = {
  accent: string;
  accentDeep: string;
  accentMuted: string;
  accentFill: string;
};

export const UNIVERSE_COLORS: Record<UniverseColorKey, UniverseColorSet> = {
  iconmind: {
    accent: "#5C7294",
    accentDeep: "#4A5E78",
    accentMuted: "rgba(92, 114, 148, 0.32)",
    accentFill: "rgba(92, 114, 148, 0.22)",
  },
  iconlove: {
    accent: "#A85F6B",
    accentDeep: "#8F4E59",
    accentMuted: "rgba(168, 95, 107, 0.32)",
    accentFill: "rgba(168, 95, 107, 0.22)",
  },
  iconetnia: {
    accent: "#4A8569",
    accentDeep: "#3D7058",
    accentMuted: "rgba(74, 133, 105, 0.32)",
    accentFill: "rgba(74, 133, 105, 0.22)",
  },
  iconfood: {
    accent: "#A87248",
    accentDeep: "#8F603A",
    accentMuted: "rgba(168, 114, 72, 0.32)",
    accentFill: "rgba(168, 114, 72, 0.22)",
  },
  iconart: {
    accent: "#7E6A9E",
    accentDeep: "#685688",
    accentMuted: "rgba(126, 106, 158, 0.32)",
    accentFill: "rgba(126, 106, 158, 0.22)",
  },
};

export function getUniverseColor(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accent;
  }
  return UNIVERSE_COLORS.iconmind.accent;
}

export function getUniverseColorDeep(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accentDeep;
  }
  return UNIVERSE_COLORS.iconmind.accentDeep;
}

export function getUniverseColorMuted(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accentMuted;
  }
  return UNIVERSE_COLORS.iconmind.accentMuted;
}

export function getUniverseColorFill(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].accentFill;
  }
  return UNIVERSE_COLORS.iconmind.accentFill;
}

export function isUniverseColorKey(id: string): id is UniverseColorKey {
  return id in UNIVERSE_COLORS;
}
