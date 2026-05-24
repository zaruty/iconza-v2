import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { UniverseDomainCard } from "@/app/components/app/universe-domain-card";
import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Universos — ICONZA",
};

export default function UniversosPage() {
  return (
    <AppScreen layout="wide">
      <header className="studio-intro">
        <p className="studio-eyebrow font-subtitle">Domínios culturais</p>
        <h1 className="studio-title font-display">Universos</h1>
        <p className="studio-lead font-subtitle">
          Cinco mundos para explorar identidade, emoção e linguagem visual.
        </p>
      </header>

      <div className="universe-catalog">
        {MOCK_UNIVERSES.map((universe) => (
          <UniverseDomainCard key={universe.id} universe={universe} />
        ))}
      </div>
    </AppScreen>
  );
}
