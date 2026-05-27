"use client";

import { useRouter } from "next/navigation";
import { OnboardingVideoPlayer } from "@/app/components/onboarding/onboarding-video-player";

type OnboardingIntroStepProps = {
  src: string;
  nextHref: string;
};

export function OnboardingIntroStep({ src, nextHref }: OnboardingIntroStepProps) {
  const router = useRouter();

  return (
    <OnboardingVideoPlayer
      src={src}
      onEnded={() => router.push(nextHref)}
    />
  );
}
