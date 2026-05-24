import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { UniverseDomainCard } from "@/app/components/app/universe-domain-card";
import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Universos — ICONZA",
};

export default function UniversosPage() {
  return (
    <AppScreen>
      <header className="app-hud-header">
        <p className="app-hud-eyebrow font-subtitle">Seus domínios</p>
        <h1 className="app-hud-title font-display">Universos</h1>
        <p className="app-hud-subtitle font-subtitle">
          Explore os cinco mundos da ICONZA e acompanhe seu domínio em cada um.
        </p>
      </header>

      <div className="universe-grid">
        {MOCK_UNIVERSES.map((universe) => (
          <UniverseDomainCard key={universe.id} universe={universe} />
        ))}
      </div>
    </AppScreen>
  );
}
