import { Lock } from "lucide-react";
import type { MockUniverse } from "@/app/lib/app/mock-student";
import { GlassPanel } from "./glass-panel";
import { ProgressBar } from "./progress-bar";

type UniverseDomainCardProps = {
  universe: MockUniverse;
};

export function UniverseDomainCard({ universe }: UniverseDomainCardProps) {
  const isLocked = universe.status === "locked";
  const isActive = universe.status === "active";

  return (
    <GlassPanel
      glow={isActive}
      className={`universe-domain-card ${isLocked ? "universe-domain-card--locked" : ""} ${isActive ? "universe-domain-card--active" : ""}`}
    >
      <div className="universe-domain-card__head">
        <div>
          <p
            className="universe-domain-card__tag font-subtitle"
            style={{ color: isLocked ? "rgba(232,237,248,0.35)" : universe.accent }}
          >
            {universe.tagline}
          </p>
          <h3 className="universe-domain-card__title font-display">{universe.name}</h3>
        </div>
        {isLocked ? (
          <span className="universe-domain-card__lock" aria-label="Bloqueado">
            <Lock className="h-4 w-4" strokeWidth={1.75} />
          </span>
        ) : null}
      </div>

      <p className="universe-domain-card__desc font-subtitle">{universe.description}</p>

      <ProgressBar
        value={universe.mastery}
        label="Domínio"
        accent={isLocked ? "rgba(180,210,255,0.2)" : universe.accent}
        showValues
      />
    </GlassPanel>
  );
}
