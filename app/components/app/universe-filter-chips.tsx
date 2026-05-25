"use client";

import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";
import { getUniverseChipFill } from "@/app/lib/app/universe-colors";

type UniverseFilterChipsProps = {
  activeUniverseId: string | null;
  onSelect: (universeId: string | null) => void;
};

export function UniverseFilterChips({
  activeUniverseId,
  onSelect,
}: UniverseFilterChipsProps) {
  return (
    <div className="universe-filter-chips" role="list" aria-label="Filtrar por universo">
      <button
        type="button"
        className={`universe-filter-chips__chip font-subtitle${activeUniverseId === null ? " is-active" : ""}`}
        role="listitem"
        data-filter="all"
        aria-pressed={activeUniverseId === null}
        onClick={() => onSelect(null)}
      >
        Todos
      </button>
      {MOCK_UNIVERSES.map((universe) => {
        const isActive = activeUniverseId === universe.id;
        const solid = getUniverseChipFill(universe.id);

        return (
          <button
            key={universe.id}
            type="button"
            className={`universe-filter-chips__chip font-subtitle${isActive ? " is-active" : ""}`}
            role="listitem"
            data-universe={universe.id}
            aria-pressed={isActive}
            style={isActive ? { backgroundColor: solid } : undefined}
            onClick={() => onSelect(universe.id)}
          >
            {universe.name}
          </button>
        );
      })}
    </div>
  );
}
