import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";

export const metadata: Metadata = {
  title: "Onboarding — ICONZA",
};

export default function OnboardingPage() {
  return (
    <AppScreen layout="default">
      <header className="studio-intro studio-intro--compact">
        <p className="studio-eyebrow font-subtitle">Boas-vindas</p>
        <h1 className="studio-title font-display">Complete seu perfil</h1>
        <p className="studio-lead font-subtitle">
          Em breve você configurará sua jornada no estúdio ICONZA.
        </p>
      </header>
    </AppScreen>
  );
}
