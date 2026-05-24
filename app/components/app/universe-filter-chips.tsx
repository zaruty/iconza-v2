import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";

export function UniverseFilterChips() {
  return (
    <div className="universe-filter-chips" role="list" aria-label="Filtrar por universo">
      {MOCK_UNIVERSES.map((universe) => (
        <button
          key={universe.id}
          type="button"
          className="universe-filter-chips__chip font-subtitle"
          role="listitem"
          style={{ borderColor: `${universe.accent}44` }}
        >
          {universe.name}
        </button>
      ))}
    </div>
  );
}
