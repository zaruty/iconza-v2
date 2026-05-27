export const ONBOARDING_MEDIA_BUCKET = "onboarding-media";

export type OnboardingVideoStep = "intro" | "welcome";

export const ONBOARDING_VIDEOS = {
  intro: {
    desktop: "IntroIconza.mp4",
    mobile: "Intro_mobile.mp4",
  },
  welcome: {
    desktop: "Boas_Vindas.mp4",
    mobile: "Boas_Vindas_Mobile.mp4",
  },
} as const satisfies Record<
  OnboardingVideoStep,
  { desktop: string; mobile: string }
>;

export const ONBOARDING_SIGNED_URL_TTL_SECONDS = 3600;
