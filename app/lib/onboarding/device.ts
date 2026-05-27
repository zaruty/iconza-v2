import { headers } from "next/headers";
import {
  ONBOARDING_VIDEOS,
  type OnboardingVideoStep,
} from "@/app/lib/onboarding/constants";

const MOBILE_UA_PATTERN =
  /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i;

export function isMobileUserAgent(userAgent: string | null | undefined) {
  if (!userAgent) return false;
  return MOBILE_UA_PATTERN.test(userAgent);
}

export async function getIsMobileFromHeaders() {
  const headerStore = await headers();
  return isMobileUserAgent(headerStore.get("user-agent"));
}

export function pickOnboardingVideoFilename(
  step: OnboardingVideoStep,
  isMobile: boolean,
) {
  const assets = ONBOARDING_VIDEOS[step];
  return isMobile ? assets.mobile : assets.desktop;
}
