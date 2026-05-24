import { Lock, Trophy } from "lucide-react";
import type { MockAchievement } from "@/app/lib/app/mock-student";

type AchievementBadgeProps = {
  achievement: MockAchievement;
};

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const locked = !achievement.unlocked;

  return (
    <article
      className={`acervo-piece ${locked ? "acervo-piece--locked" : "acervo-piece--unlocked"}`}
    >
      <div className="acervo-piece__icon-wrap" aria-hidden>
        {locked ? (
          <Lock className="acervo-piece__icon" strokeWidth={1.5} />
        ) : (
          <Trophy className="acervo-piece__icon" strokeWidth={1.5} />
        )}
      </div>
      <h3 className="acervo-piece__name font-subtitle">{achievement.name}</h3>
      <p className="acervo-piece__desc font-subtitle">{achievement.description}</p>
    </article>
  );
}
