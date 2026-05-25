import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { ExploreGallery } from "@/app/components/app/explore-gallery";
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

      <ExploreGallery items={MOCK_EXPLORE_ITEMS} />
    </AppScreen>
  );
}
