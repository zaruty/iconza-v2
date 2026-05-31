"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingVideoPlayer } from "@/app/components/onboarding/onboarding-video-player";
import { APP_ROUTES } from "@/app/lib/app/routes";
import { completeOnboarding } from "@/app/lib/onboarding/actions";

type OnboardingWelcomeStepProps = {
  src: string;
  continueDelayMs?: number;
};

export function OnboardingWelcomeStep({
  src,
  continueDelayMs = 3000,
}: OnboardingWelcomeStepProps) {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setShowContinue(true), continueDelayMs);
    return () => window.clearTimeout(timer);
  }, [continueDelayMs]);

  async function handleContinue() {
    setError("");
    setLoading(true);

    const result = await completeOnboarding();
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    router.push(APP_ROUTES.dashboard);
    router.refresh();
  }

  return (
    <div className="onboarding-video onboarding-video--welcome">
      <OnboardingVideoPlayer src={src} onEnded={() => {}} />

      {showContinue ? (
        <div className="onboarding-video__continue-wrap">
          {error ? (
            <p className="onboarding-video__error font-subtitle" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            className="onboarding-video__continue"
            onClick={() => void handleContinue()}
            disabled={loading}
          >
            {loading ? "..." : "CONTINUAR"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
