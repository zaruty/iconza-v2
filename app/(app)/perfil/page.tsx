import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { GlassPanel } from "@/app/components/app/glass-panel";
import { ProfileHeader } from "@/app/components/app/profile-header";
import { MOCK_STUDENT } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Perfil — ICONZA",
};

export default function PerfilPage() {
  return (
    <AppScreen>
      <ProfileHeader />

      <section className="profile-stats">
        <GlassPanel className="profile-stat">
          <span className="profile-stat__value font-display">
            {MOCK_STUDENT.stats.totalXp}
          </span>
          <span className="profile-stat__label font-subtitle">XP total</span>
        </GlassPanel>
        <GlassPanel className="profile-stat">
          <span className="profile-stat__value font-display">
            {MOCK_STUDENT.stats.universesStarted}
          </span>
          <span className="profile-stat__label font-subtitle">Universos</span>
        </GlassPanel>
        <GlassPanel className="profile-stat">
          <span className="profile-stat__value font-display">
            {MOCK_STUDENT.stats.achievements}
          </span>
          <span className="profile-stat__label font-subtitle">Conquistas</span>
        </GlassPanel>
      </section>

      <section className="profile-section">
        <h2 className="app-hud-section-title font-display">Publicações</h2>
        <GlassPanel className="profile-empty">
          <p className="font-subtitle">Nenhuma publicação ainda.</p>
          <p className="profile-empty__hint font-subtitle">
            Suas criações aparecerão aqui quando você compartilhar ícones.
          </p>
        </GlassPanel>
      </section>

      <button type="button" className="app-hud-btn font-subtitle">
        Editar perfil
      </button>
    </AppScreen>
  );
}
