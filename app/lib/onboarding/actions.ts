"use server";

import { createClient } from "@/app/lib/supabase/server";

export type OnboardingActionResult =
  | { success: true }
  | { success: false; error: string };

export async function completeOnboarding(): Promise<OnboardingActionResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Sessão inválida. Entre novamente." };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao concluir onboarding.";
    return { success: false, error: message };
  }
}
