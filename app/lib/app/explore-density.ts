export type ExploreDensity = "compact" | "medium" | "expanded";

export const EXPLORE_DENSITY_OPTIONS: {
  id: ExploreDensity;
  label: string;
}[] = [
  { id: "compact", label: "Compacto" },
  { id: "medium", label: "Médio" },
  { id: "expanded", label: "Expandido" },
];

export const DEFAULT_EXPLORE_DENSITY: ExploreDensity = "medium";

const STORAGE_KEY = "iconza-explore-density";

export function loadExploreDensity(): ExploreDensity {
  if (typeof window === "undefined") return DEFAULT_EXPLORE_DENSITY;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "compact" || stored === "medium" || stored === "expanded") {
    return stored;
  }
  return DEFAULT_EXPLORE_DENSITY;
}

export function saveExploreDensity(density: ExploreDensity) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, density);
}
