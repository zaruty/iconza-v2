import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";
import { getUniverseColor, getUniverseColorFill } from "@/app/lib/app/universe-colors";

export function UniverseFilterChips() {
  return (
    <div className="universe-filter-chips" role="list" aria-label="Filtrar por universo">
      {MOCK_UNIVERSES.map((universe) => {
        const accent = getUniverseColor(universe.id);
        const fill = getUniverseColorFill(universe.id);

        return (
          <button
            key={universe.id}
            type="button"
            className="universe-filter-chips__chip font-subtitle"
            role="listitem"
            data-universe={universe.id}
            style={{
              backgroundColor: fill,
              borderColor: `${accent}73`,
              color: accent,
            }}
          >
            {universe.name}
          </button>
        );
      })}
    </div>
  );
}
