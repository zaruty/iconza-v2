"use client";

import { useSyncExternalStore } from "react";
import AuroraBackground from "./AuroraBackground";
import { NeuralCanvas } from "./neural-canvas";
import { NeuralCanvasBoundary } from "./neural-canvas-boundary";

function shouldReduceEffects() {
  if (typeof window === "undefined") return true;

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.innerWidth < 768
  );
}

function subscribe(onStoreChange: () => void) {
  const queries = [
    window.matchMedia("(pointer: coarse)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  ];

  for (const query of queries) {
    query.addEventListener("change", onStoreChange);
  }

  window.addEventListener("resize", onStoreChange);

  return () => {
    for (const query of queries) {
      query.removeEventListener("change", onStoreChange);
    }
    window.removeEventListener("resize", onStoreChange);
  };
}

export function HomeAtmosphere() {
  const reduceEffects = useSyncExternalStore(
    subscribe,
    shouldReduceEffects,
    () => true,
  );

  return (
    <>
      <AuroraBackground />
      {reduceEffects ? null : (
        <NeuralCanvasBoundary>
          <NeuralCanvas scope="viewport" />
        </NeuralCanvasBoundary>
      )}
    </>
  );
}
