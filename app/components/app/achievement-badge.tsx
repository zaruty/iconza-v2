import { Lock, Trophy } from "lucide-react";
import type { MockAchievement } from "@/app/lib/app/mock-student";
import { GlassPanel } from "./glass-panel";

type AchievementBadgeProps = {
  achievement: MockAchievement;
};

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const locked = !achievement.unlocked;

  return (
    <GlassPanel
      className={`achievement-badge ${locked ? "achievement-badge--locked" : "achievement-badge--unlocked"}`}
    >
      <div className="achievement-badge__icon-wrap" aria-hidden>
        {locked ? (
          <Lock className="achievement-badge__icon" strokeWidth={1.75} />
        ) : (
          <Trophy className="achievement-badge__icon" strokeWidth={1.75} />
        )}
      </div>
      <h3 className="achievement-badge__name font-display">{achievement.name}</h3>
      <p className="achievement-badge__desc font-subtitle">{achievement.description}</p>
    </GlassPanel>
  );
}
