"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingVideoPlayer } from "@/app/components/onboarding/onboarding-video-player";

type OnboardingWelcomeStepProps = {
  src: string;
  continueHref: string;
  continueDelayMs?: number;
};

export function OnboardingWelcomeStep({
  src,
  continueHref,
  continueDelayMs = 3000,
}: OnboardingWelcomeStepProps) {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowContinue(true), continueDelayMs);
    return () => window.clearTimeout(timer);
  }, [continueDelayMs]);

  return (
    <div className="onboarding-video onboarding-video--welcome">
      <OnboardingVideoPlayer src={src} onEnded={() => {}} />

      {showContinue ? (
        <div className="onboarding-video__continue-wrap">
          <button
            type="button"
            className="onboarding-video__continue"
            onClick={() => router.push(continueHref)}
          >
            CONTINUAR
          </button>
        </div>
      ) : null}
    </div>
  );
}
