"use client";

import { AppScreen } from "@/app/components/app/app-screen";
import { CreativeBrainMap } from "@/app/components/app/creative-brain-map";
import { ProgressBar } from "@/app/components/app/progress-bar";
import { DEFAULT_BRAIN_MAP_CONFIG } from "@/app/lib/app/brain-map-config";
import { getUniverseColor } from "@/app/lib/app/universe-colors";
import { MOCK_STUDENT } from "@/app/lib/app/mock-student";
import { useUser } from "@/app/lib/auth/use-user";

export default function DashboardPage() {
  const { firstName, loading } = useUser();

  if (loading) {
    return (
      <div className="app-hud-loading">
        <span className="auth-spinner" aria-label="Carregando" />
      </div>
    );
  }

  const { continueLearning } = MOCK_STUDENT;
  const continueAccent = getUniverseColor(continueLearning.universeId);

  return (
    <AppScreen layout="wide">
      <header className="studio-intro">
        <p className="studio-eyebrow font-subtitle">Continuidade</p>
        <h1 className="studio-title font-display">Olá, {firstName}</h1>
        <p className="studio-lead font-subtitle">
          Sua jornada visual segue em {continueLearning.universeName}.
        </p>
      </header>

      <div className="studio-home-grid">
        <article className="studio-continue">
          <p className="studio-continue__label font-subtitle">Em progresso</p>
          <h2 className="studio-continue__title font-display">
            {continueLearning.universeName}
          </h2>
          <ProgressBar
            value={continueLearning.progress}
            label="Etapa atual"
            accent={continueAccent}
            showValues
          />
        </article>

        <aside className="studio-presence">
          <p className="studio-presence__role font-display">{MOCK_STUDENT.level}</p>
          <p className="studio-presence__meta font-subtitle">
            {MOCK_STUDENT.xp} XP · meta {MOCK_STUDENT.xpGoal}
          </p>
          <ProgressBar
            value={MOCK_STUDENT.xp}
            max={MOCK_STUDENT.xpGoal}
            label="Ritmo"
            showValues
          />
        </aside>
      </div>

      <section className="studio-section">
        <div className="studio-section__head">
          <h2 className="studio-section__title font-display">Constelação</h2>
          <p className="studio-section__desc font-subtitle">
            Seus universos conectados em uma trilha viva de descoberta.
          </p>
        </div>
        <div className="studio-constellation">
          <CreativeBrainMap config={DEFAULT_BRAIN_MAP_CONFIG} />
        </div>
      </section>
    </AppScreen>
  );
}
