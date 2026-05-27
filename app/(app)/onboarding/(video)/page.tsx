import type { Metadata } from "next";
import { OnboardingIntroStep } from "@/app/components/onboarding/onboarding-intro-step";
import {
  getIsMobileFromHeaders,
  pickOnboardingVideoFilename,
} from "@/app/lib/onboarding/device";
import { getSignedOnboardingVideoUrl } from "@/app/lib/onboarding/storage";

export const metadata: Metadata = {
  title: "Onboarding — ICONZA",
};

export default async function OnboardingPage() {
  const isMobile = await getIsMobileFromHeaders();
  const filename = pickOnboardingVideoFilename("intro", isMobile);
  const videoUrl = await getSignedOnboardingVideoUrl(filename);

  if (!videoUrl) {
    return (
      <div className="onboarding-video__error font-subtitle">
        Não foi possível carregar o vídeo de introdução. Tente novamente em
        instantes.
      </div>
    );
  }

  return (
    <OnboardingIntroStep src={videoUrl} nextHref="/onboarding/step/2" />
  );
}
