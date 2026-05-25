import type { CSSProperties } from "react";
import { Lock } from "lucide-react";
import type { MockUniverse } from "@/app/lib/app/mock-student";
import { ProgressBar } from "./progress-bar";

type UniverseDomainCardProps = {
  universe: MockUniverse;
};

export function UniverseDomainCard({ universe }: UniverseDomainCardProps) {
  const isLocked = universe.status === "locked";
  const isActive = universe.status === "active";

  return (
    <article
      className={`universe-domain ${isLocked ? "universe-domain--locked" : ""} ${isActive ? "universe-domain--active" : ""}`}
      data-universe={universe.id}
      style={{ "--domain-accent": universe.accent } as CSSProperties}
    >
      <div className="universe-domain__accent-bar" aria-hidden />
      <div className="universe-domain__content">
        <div className="universe-domain__head">
          <div>
            <p
              className={`universe-domain__tag font-subtitle ${isLocked ? "is-locked" : ""}`}
            >
              {universe.tagline}
            </p>
            <h3 className="universe-domain__title font-display">{universe.name}</h3>
          </div>
          {isLocked ? (
            <span className="universe-domain__lock" aria-label="Bloqueado">
              <Lock className="h-4 w-4" strokeWidth={1.5} />
            </span>
          ) : null}
        </div>
        <p className="universe-domain__desc font-subtitle">{universe.description}</p>
        {!isLocked ? (
          <ProgressBar
            value={universe.mastery}
            label="Domínio"
            accent={universe.accent}
            accentDeep={universe.accentDeep}
            showValues
            variant="premium"
          />
        ) : null}
      </div>
    </article>
  );
}
