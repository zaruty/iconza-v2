import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { AchievementBadge } from "@/app/components/app/achievement-badge";
import { GlassPanel } from "@/app/components/app/glass-panel";
import { ProgressBar } from "@/app/components/app/progress-bar";
import { MOCK_ACHIEVEMENTS, MOCK_STUDENT } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Conquistas — ICONZA",
};

export default function ConquistasPage() {
  const unlockedCount = MOCK_ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <AppScreen>
      <header className="app-hud-header">
        <p className="app-hud-eyebrow font-subtitle">Gamificação</p>
        <h1 className="app-hud-title font-display">Seu Acervo</h1>
        <p className="app-hud-subtitle font-subtitle">
          {unlockedCount} de {MOCK_ACHIEVEMENTS.length} badges desbloqueadas
        </p>
      </header>

      <GlassPanel className="conquistas-xp-card">
        <div className="conquistas-xp-card__head">
          <span className="font-subtitle">Experiência acumulada</span>
          <span className="conquistas-xp-card__value font-display">
            {MOCK_STUDENT.xp} XP
          </span>
        </div>
        <ProgressBar
          value={MOCK_STUDENT.xp}
          max={MOCK_STUDENT.xpGoal}
          accent="#7B88FF"
          showValues
        />
      </GlassPanel>

      <div className="achievement-grid">
        {MOCK_ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </AppScreen>
  );
}
