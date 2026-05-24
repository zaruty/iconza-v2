import type { Metadata } from "next";
import { AppScreen } from "@/app/components/app/app-screen";
import { AchievementBadge } from "@/app/components/app/achievement-badge";
import { ProgressBar } from "@/app/components/app/progress-bar";
import { MOCK_ACHIEVEMENTS, MOCK_STUDENT } from "@/app/lib/app/mock-student";

export const metadata: Metadata = {
  title: "Conquistas — ICONZA",
};

export default function ConquistasPage() {
  const unlockedCount = MOCK_ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <AppScreen layout="wide">
      <header className="studio-intro">
        <p className="studio-eyebrow font-subtitle">Acervo</p>
        <h1 className="studio-title font-display">Peças conquistadas</h1>
        <p className="studio-lead font-subtitle">
          {unlockedCount} de {MOCK_ACHIEVEMENTS.length} marcos · {MOCK_STUDENT.xp}{" "}
          XP acumulados
        </p>
      </header>

      <div className="acervo-progress">
        <ProgressBar
          value={MOCK_STUDENT.xp}
          max={MOCK_STUDENT.xpGoal}
          label="Ritmo da jornada"
          showValues
        />
      </div>

      <div className="acervo-grid">
        {MOCK_ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </AppScreen>
  );
}
