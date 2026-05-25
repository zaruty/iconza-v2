"use client";

import { useEffect, useMemo, useState } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";
import { ExploreContentCard } from "@/app/components/app/explore-content-card";
import { UniverseFilterChips } from "@/app/components/app/universe-filter-chips";
import {
  DEFAULT_EXPLORE_DENSITY,
  EXPLORE_DENSITY_OPTIONS,
  loadExploreDensity,
  saveExploreDensity,
  type ExploreDensity,
} from "@/app/lib/app/explore-density";

type ExploreGalleryProps = {
  items: MockExploreItem[];
};

export function ExploreGallery({ items }: ExploreGalleryProps) {
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(null);
  const [density, setDensity] = useState<ExploreDensity>(DEFAULT_EXPLORE_DENSITY);

  useEffect(() => {
    setDensity(loadExploreDensity());
  }, []);

  const filteredItems = useMemo(
    () =>
      activeUniverseId
        ? items.filter((item) => item.universeId === activeUniverseId)
        : items,
    [activeUniverseId, items],
  );

  function handleDensityChange(next: ExploreDensity) {
    setDensity(next);
    saveExploreDensity(next);
  }

  return (
    <div className="explore-gallery">
      <div className="explore-gallery__toolbar">
        <UniverseFilterChips
          activeUniverseId={activeUniverseId}
          onSelect={setActiveUniverseId}
        />
        <div
          className="explore-density"
          role="group"
          aria-label="Densidade visual da galeria"
        >
          {EXPLORE_DENSITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`explore-density__btn font-subtitle${density === option.id ? " is-active" : ""}`}
              aria-pressed={density === option.id}
              onClick={() => handleDensityChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="explore-masonry" data-density={density}>
        {filteredItems.map((item) => (
          <ExploreContentCard key={item.id} item={item} density={density} />
        ))}
      </div>
    </div>
  );
}
