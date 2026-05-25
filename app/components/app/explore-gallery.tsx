"use client";

import { useMemo, useState } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";
import { ExploreContentCard } from "@/app/components/app/explore-content-card";
import { UniverseFilterChips } from "@/app/components/app/universe-filter-chips";

type ExploreGalleryProps = {
  items: MockExploreItem[];
};

export function ExploreGallery({ items }: ExploreGalleryProps) {
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(null);

  const filteredItems = useMemo(
    () =>
      activeUniverseId
        ? items.filter((item) => item.universeId === activeUniverseId)
        : items,
    [activeUniverseId, items],
  );

  return (
    <>
      <UniverseFilterChips
        activeUniverseId={activeUniverseId}
        onSelect={setActiveUniverseId}
      />
      <div className="explore-masonry">
        {filteredItems.map((item) => (
          <ExploreContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
