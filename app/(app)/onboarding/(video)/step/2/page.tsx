import type { Metadata } from "next";
import { OnboardingWelcomeStep } from "@/app/components/onboarding/onboarding-welcome-step";
import {
  getIsMobileFromHeaders,
  pickOnboardingVideoFilename,
} from "@/app/lib/onboarding/device";
import { getSignedOnboardingVideoUrl } from "@/app/lib/onboarding/storage";

export const metadata: Metadata = {
  title: "Boas-vindas — ICONZA",
};

export default async function OnboardingStep2Page() {
  const isMobile = await getIsMobileFromHeaders();
  const filename = pickOnboardingVideoFilename("welcome", isMobile);
  const videoUrl = await getSignedOnboardingVideoUrl(filename);

  if (!videoUrl) {
    return (
      <div className="onboarding-video__error font-subtitle">
        Não foi possível carregar o vídeo de boas-vindas. Tente novamente em
        instantes.
      </div>
    );
  }

  return <OnboardingWelcomeStep src={videoUrl} />;
}
