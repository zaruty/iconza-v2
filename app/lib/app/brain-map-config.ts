import type { MockUniverse } from "@/app/lib/app/mock-student";

export type BrainMapAssetMode = "svg" | "image";

export type BrainMapNode = MockUniverse & {
  cx: number;
  cy: number;
  isActive: boolean;
  isAvailable: boolean;
};

export type BrainMapConfig = {
  mode: BrainMapAssetMode;
  imageSrc?: string;
  imageAlt?: string;
};

/** Default constellation — SVG vector; swap to image mode when asset is ready */
export const DEFAULT_BRAIN_MAP_CONFIG: BrainMapConfig = {
  mode: "svg",
};

export function buildBrainMapNodes(universes: MockUniverse[]): BrainMapNode[] {
  return universes.map((universe, index) => {
    const angle = (index / universes.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 68;
    const cx = 120 + Math.cos(angle) * radius;
    const cy = 110 + Math.sin(angle) * radius;

    return {
      ...universe,
      cx,
      cy,
      isActive: universe.status === "active",
      isAvailable: universe.status === "available",
    };
  });
}
