import type { CSSProperties } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";
import {
  getUniverseCardPigment,
  getUniverseCardPigmentDeep,
  getUniverseColorDeep,
} from "@/app/lib/app/universe-colors";

type ExploreContentCardProps = {
  item: MockExploreItem;
};

export function ExploreContentCard({ item }: ExploreContentCardProps) {
  return (
    <article
      className="explore-pin"
      data-universe={item.universeId}
      style={
        {
          "--explore-pigment": getUniverseCardPigment(item.universeId),
          "--explore-pigment-deep": getUniverseCardPigmentDeep(item.universeId),
          "--explore-accent": getUniverseColorDeep(item.universeId),
        } as CSSProperties
      }
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
