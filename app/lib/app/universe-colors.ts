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
  cardPigment: string;
  cardPigmentDeep: string;
  chipFill: string;
  chipBorder: string;
};

/** Illustrated premium pigments — solid fills, not neon */
export const UNIVERSE_COLORS: Record<UniverseColorKey, UniverseColorSet> = {
  iconmind: {
    accent: "#6F8FB8",
    accentDeep: "#5A7BA3",
    accentMuted: "rgba(111, 143, 184, 0.32)",
    accentFill: "rgba(111, 143, 184, 0.22)",
    cardPigment: "#82A0CA",
    cardPigmentDeep: "#6F8FB8",
    chipFill: "#6F8FB8",
    chipBorder: "#6F8FB8",
  },
  iconlove: {
    accent: "#C26D8C",
    accentDeep: "#A85A75",
    accentMuted: "rgba(194, 109, 140, 0.32)",
    accentFill: "rgba(194, 109, 140, 0.22)",
    cardPigment: "#D07F9A",
    cardPigmentDeep: "#C26D8C",
    chipFill: "#C26D8C",
    chipBorder: "#C26D8C",
  },
  iconetnia: {
    accent: "#7A5CCF",
    accentDeep: "#6348B0",
    accentMuted: "rgba(122, 92, 207, 0.32)",
    accentFill: "rgba(122, 92, 207, 0.22)",
    cardPigment: "#9170E0",
    cardPigmentDeep: "#7A5CCF",
    chipFill: "#7A5CCF",
    chipBorder: "#7A5CCF",
  },
  iconfood: {
    accent: "#E0A11B",
    accentDeep: "#C48812",
    accentMuted: "rgba(224, 161, 27, 0.32)",
    accentFill: "rgba(224, 161, 27, 0.22)",
    cardPigment: "#E8AF28",
    cardPigmentDeep: "#E0A11B",
    chipFill: "#E0A11B",
    chipBorder: "#E0A11B",
  },
  iconart: {
    accent: "#D97832",
    accentDeep: "#BC6428",
    accentMuted: "rgba(217, 120, 50, 0.32)",
    accentFill: "rgba(217, 120, 50, 0.22)",
    cardPigment: "#E08845",
    cardPigmentDeep: "#D97832",
    chipFill: "#D97832",
    chipBorder: "#D97832",
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

export function getUniverseCardPigment(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].cardPigment;
  }
  return UNIVERSE_COLORS.iconmind.cardPigment;
}

export function getUniverseCardPigmentDeep(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].cardPigmentDeep;
  }
  return UNIVERSE_COLORS.iconmind.cardPigmentDeep;
}

export function getUniverseChipFill(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].chipFill;
  }
  return UNIVERSE_COLORS.iconmind.chipFill;
}

export function getUniverseChipBorder(id: string): string {
  if (id in UNIVERSE_COLORS) {
    return UNIVERSE_COLORS[id as UniverseColorKey].chipBorder;
  }
  return UNIVERSE_COLORS.iconmind.chipBorder;
}

export function isUniverseColorKey(id: string): id is UniverseColorKey {
  return id in UNIVERSE_COLORS;
}
