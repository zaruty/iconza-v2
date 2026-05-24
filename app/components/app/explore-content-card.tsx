import type { CSSProperties } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";
import { GlassPanel } from "./glass-panel";

type ExploreContentCardProps = {
  item: MockExploreItem;
};

export function ExploreContentCard({ item }: ExploreContentCardProps) {
  return (
    <GlassPanel className="explore-card" data-universe={item.universeId}>
      <div
        className="explore-card__visual"
        style={{ "--explore-accent": item.accent } as CSSProperties}
        aria-hidden
      />
      <div className="explore-card__body">
        <p
          className="explore-card__universe font-subtitle"
          style={{ color: item.accent }}
        >
          {item.universeName}
        </p>
        <h3 className="explore-card__title font-display">{item.title}</h3>
        <p className="explore-card__author font-subtitle">{item.author}</p>
      </div>
    </GlassPanel>
  );
}
