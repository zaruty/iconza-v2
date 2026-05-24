"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppScreen } from "@/app/components/app/app-screen";
import { CreativeBrainMap } from "@/app/components/app/creative-brain-map";
import { GlassPanel } from "@/app/components/app/glass-panel";
import { ProgressBar } from "@/app/components/app/progress-bar";
import { MOCK_STUDENT } from "@/app/lib/app/mock-student";
import { getSession } from "@/app/lib/auth/session";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="app-hud-loading">
        <span className="auth-spinner" aria-label="Carregando" />
      </div>
    );
  }

  const { continueLearning } = MOCK_STUDENT;

  return (
    <AppScreen>
      <header className="app-hud-header">
        <p className="app-hud-eyebrow font-subtitle">Bem-vinda de volta</p>
        <h1 className="app-hud-title font-display">
          Olá, {MOCK_STUDENT.firstName}
        </h1>
      </header>

      <GlassPanel className="dashboard-level-card">
        <div className="dashboard-level-card__head">
          <div>
            <p className="dashboard-level-card__label font-subtitle">Nível atual</p>
            <p className="dashboard-level-card__level font-display">
              {MOCK_STUDENT.level}
            </p>
          </div>
          <span className="dashboard-level-card__xp font-subtitle">
            {MOCK_STUDENT.xp} XP
          </span>
        </div>
        <ProgressBar
          value={MOCK_STUDENT.xp}
          max={MOCK_STUDENT.xpGoal}
          label="Progresso para o próximo nível"
          showValues
        />
      </GlassPanel>

      <section className="dashboard-section">
        <h2 className="app-hud-section-title font-display">Mapa mental</h2>
        <GlassPanel className="dashboard-brain-wrap">
          <CreativeBrainMap />
        </GlassPanel>
      </section>

      <section className="dashboard-section">
        <h2 className="app-hud-section-title font-display">Continuar</h2>
        <GlassPanel glow pulse className="dashboard-continue-card">
          <p className="dashboard-continue-card__label font-subtitle">Universo ativo</p>
          <h3 className="dashboard-continue-card__title font-display">
            {continueLearning.universeName}
          </h3>
          <ProgressBar
            value={continueLearning.progress}
            label="Progresso da etapa"
            showValues
          />
        </GlassPanel>
      </section>
    </AppScreen>
  );
}
