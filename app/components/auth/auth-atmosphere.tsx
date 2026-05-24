"use client";

import AuroraBackground from "../AuroraBackground";
import { NeuralCanvas } from "../neural-canvas";

export function AuthAtmosphere() {
  return (
    <div className="auth-atmosphere" aria-hidden>
      <AuroraBackground />
      <NeuralCanvas />
    </div>
  );
}
