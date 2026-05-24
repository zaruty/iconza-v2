import type { CSSProperties } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";

type ExploreContentCardProps = {
  item: MockExploreItem;
};

export function ExploreContentCard({ item }: ExploreContentCardProps) {
  return (
    <article
      className="explore-pin"
      data-universe={item.universeId}
      style={{ "--explore-accent": item.accent } as CSSProperties}
    >
      <div className="explore-pin__visual" aria-hidden />
      <div className="explore-pin__body">
        <p className="explore-pin__universe font-subtitle">{item.universeName}</p>
        <h3 className="explore-pin__title font-subtitle">{item.title}</h3>
        <p className="explore-pin__author font-subtitle">{item.author}</p>
      </div>
    </article>
  );
}
