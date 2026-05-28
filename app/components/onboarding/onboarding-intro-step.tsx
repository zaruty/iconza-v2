"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingVideoPlayer } from "@/app/components/onboarding/onboarding-video-player";

type OnboardingIntroStepProps = {
  src: string;
  nextHref: string;
};

export function OnboardingIntroStep({ src, nextHref }: OnboardingIntroStepProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextHref);
  }, [router, nextHref]);

  return (
    <OnboardingVideoPlayer
      src={src}
      exitFadeOnEnd
      onEnded={() => router.push(nextHref)}
    />
  );
}
