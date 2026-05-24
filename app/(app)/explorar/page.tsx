import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { ExploreContentCard } from "@/app/components/app/explore-content-card";
import { UniverseFilterChips } from "@/app/components/app/universe-filter-chips";
import { MOCK_EXPLORE_ITEMS } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Explorar — ICONZA",
};

export default function ExplorarPage() {
  return (
    <AppScreen layout="full">
      <header className="studio-intro studio-intro--compact">
        <p className="studio-eyebrow font-subtitle">Descoberta</p>
        <h1 className="studio-title font-display">Explorar</h1>
        <p className="studio-lead font-subtitle">
          Curadoria viva da comunidade — referências, gestos e universos.
        </p>
      </header>

      <UniverseFilterChips />

      <div className="explore-masonry">
        {MOCK_EXPLORE_ITEMS.map((item) => (
          <ExploreContentCard key={item.id} item={item} />
        ))}
      </div>
    </AppScreen>
  );
}
