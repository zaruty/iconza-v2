import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";

export const metadata: Metadata = {
  title: "Onboarding — Etapa 3 — ICONZA",
};

export default function OnboardingStep3Page() {
  return (
    <AppScreen layout="default">
      <header className="studio-intro studio-intro--compact">
        <p className="studio-eyebrow font-subtitle">Próxima etapa</p>
        <h1 className="studio-title font-display">Em breve</h1>
        <p className="studio-lead font-subtitle">
          A etapa 3 do onboarding será disponibilizada em breve.
        </p>
      </header>
    </AppScreen>
  );
}
