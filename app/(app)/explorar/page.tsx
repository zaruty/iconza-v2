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
    <AppScreen>
      <header className="app-hud-header">
        <p className="app-hud-eyebrow font-subtitle">Inspiração</p>
        <h1 className="app-hud-title font-display">Descubra</h1>
        <p className="app-hud-subtitle font-subtitle">
          Explore criações da comunidade e encontre novos caminhos visuais.
        </p>
      </header>

      <UniverseFilterChips />

      <div className="explore-grid">
        {MOCK_EXPLORE_ITEMS.map((item) => (
          <ExploreContentCard key={item.id} item={item} />
        ))}
      </div>
    </AppScreen>
  );
}
