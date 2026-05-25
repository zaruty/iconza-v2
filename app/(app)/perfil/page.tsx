import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { ProfileActions } from "@/app/components/app/profile-actions";
import { ProfileHeader } from "@/app/components/app/profile-header";

export const metadata: Metadata = {
  title: "Perfil — ICONZA",
};

export default function PerfilPage() {
  return (
    <AppScreen layout="wide">
      <ProfileHeader />

      <section className="studio-section">
        <div className="studio-section__head">
          <h2 className="studio-section__title font-display">Publicações</h2>
          <p className="studio-section__desc font-subtitle">
            Peças visuais que você compartilhou com a comunidade.
          </p>
        </div>
        <div className="profile-empty-state">
          <p className="profile-empty-state__title font-subtitle">
            Seu portfólio está começando.
          </p>
          <p className="profile-empty-state__hint font-subtitle">
            Criações publicadas aparecerão aqui — como um Read.cv visual.
          </p>
        </div>
      </section>

      <ProfileActions />
    </AppScreen>
  );
}
