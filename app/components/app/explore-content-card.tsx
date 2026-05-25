import Image from "next/image";
import type { CSSProperties } from "react";
import type { MockExploreItem } from "@/app/lib/app/mock-student";
import { getUniverseColor } from "@/app/lib/app/universe-colors";

type ExploreContentCardProps = {
  item: MockExploreItem;
};

export function ExploreContentCard({ item }: ExploreContentCardProps) {
  return (
    <article
      className="explore-pin"
      data-universe={item.universeId}
      style={{ "--explore-accent": getUniverseColor(item.universeId) } as CSSProperties}
    >
      <div className="explore-pin__media">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          width={800}
          height={1000}
          className="explore-pin__image"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 25vw"
        />
        <div className="explore-pin__overlay" aria-hidden />
      </div>
      <div className="explore-pin__body">
        <p className="explore-pin__universe font-subtitle">{item.universeName}</p>
        <h3 className="explore-pin__title font-display">{item.title}</h3>
        <p className="explore-pin__author font-subtitle">{item.author}</p>
      </div>
    </article>
  );
}
