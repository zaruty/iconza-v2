import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";
import {
  getUniverseChipBorder,
  getUniverseChipFill,
  getUniverseColorDeep,
} from "@/app/lib/app/universe-colors";

export function UniverseFilterChips() {
  return (
    <div className="universe-filter-chips" role="list" aria-label="Filtrar por universo">
      {MOCK_UNIVERSES.map((universe) => {
        const labelColor = getUniverseColorDeep(universe.id);
        const fill = getUniverseChipFill(universe.id);
        const border = getUniverseChipBorder(universe.id);

        return (
          <button
            key={universe.id}
            type="button"
            className="universe-filter-chips__chip font-subtitle"
            role="listitem"
            data-universe={universe.id}
            style={{
              backgroundColor: fill,
              borderColor: border,
              color: labelColor,
            }}
          >
            {universe.name}
          </button>
        );
      })}
    </div>
  );
}
