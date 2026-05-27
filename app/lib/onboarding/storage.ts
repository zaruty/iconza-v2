import {
  ONBOARDING_MEDIA_BUCKET,
  ONBOARDING_SIGNED_URL_TTL_SECONDS,
} from "@/app/lib/onboarding/constants";
import { createClient } from "@/app/lib/supabase/server";

export async function getSignedOnboardingVideoUrl(filename: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(ONBOARDING_MEDIA_BUCKET)
    .createSignedUrl(filename, ONBOARDING_SIGNED_URL_TTL_SECONDS);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}
