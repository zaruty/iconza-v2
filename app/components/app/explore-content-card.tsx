import type { MockExploreItem } from "@/app/lib/app/mock-student";
import { GlassPanel } from "./glass-panel";

type ExploreContentCardProps = {
  item: MockExploreItem;
};

export function ExploreContentCard({ item }: ExploreContentCardProps) {
  return (
    <GlassPanel className="explore-card">
      <div
        className="explore-card__visual"
        style={{
          background: `linear-gradient(145deg, ${item.accent}55 0%, rgba(10,18,40,0.2) 100%)`,
        }}
        aria-hidden
      />
      <div className="explore-card__body">
        <p className="explore-card__universe font-subtitle">{item.universeName}</p>
        <h3 className="explore-card__title font-display">{item.title}</h3>
        <p className="explore-card__author font-subtitle">{item.author}</p>
      </div>
    </GlassPanel>
  );
}
