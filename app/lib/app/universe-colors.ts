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

export const UNIVERSE_COLORS: Record<UniverseColorKey, UniverseColorSet> = {
  iconmind: {
    accent: "#5C7294",
    accentDeep: "#4A5E78",
    accentMuted: "rgba(92, 114, 148, 0.32)",
    accentFill: "rgba(92, 114, 148, 0.22)",
    cardPigment: "#8EA4C2",
    cardPigmentDeep: "#758AA5",
    chipFill: "rgba(142, 164, 194, 0.14)",
    chipBorder: "rgba(142, 164, 194, 0.31)",
  },
  iconlove: {
    accent: "#A85F6B",
    accentDeep: "#8F4E59",
    accentMuted: "rgba(168, 95, 107, 0.32)",
    accentFill: "rgba(168, 95, 107, 0.22)",
    cardPigment: "#C998A5",
    cardPigmentDeep: "#B88492",
    chipFill: "rgba(201, 152, 165, 0.14)",
    chipBorder: "rgba(201, 152, 165, 0.31)",
  },
  iconetnia: {
    accent: "#4A8569",
    accentDeep: "#3D7058",
    accentMuted: "rgba(74, 133, 105, 0.32)",
    accentFill: "rgba(74, 133, 105, 0.22)",
    cardPigment: "#8FB39A",
    cardPigmentDeep: "#7A9F85",
    chipFill: "rgba(143, 179, 154, 0.14)",
    chipBorder: "rgba(143, 179, 154, 0.31)",
  },
  iconfood: {
    accent: "#A87248",
    accentDeep: "#8F603A",
    accentMuted: "rgba(168, 114, 72, 0.32)",
    accentFill: "rgba(168, 114, 72, 0.22)",
    cardPigment: "#C49B6B",
    cardPigmentDeep: "#B08858",
    chipFill: "rgba(196, 155, 107, 0.16)",
    chipBorder: "rgba(196, 155, 107, 0.34)",
  },
  iconart: {
    accent: "#7E6A9E",
    accentDeep: "#685688",
    accentMuted: "rgba(126, 106, 158, 0.32)",
    accentFill: "rgba(126, 106, 158, 0.22)",
    cardPigment: "#A996C9",
    cardPigmentDeep: "#9680B5",
    chipFill: "rgba(169, 150, 201, 0.14)",
    chipBorder: "rgba(169, 150, 201, 0.31)",
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
