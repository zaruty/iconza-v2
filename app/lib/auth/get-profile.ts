import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase/client";
import type { Profile } from "./profile-types";

export async function getProfile(
  userId: string,
  supabase?: SupabaseClient,
): Promise<Profile | null> {
  const client = supabase ?? createClient();

  const { data, error } = await client
    .from("profiles")
    .select(
      "id, email, nome_completo, telefone, pais, cidade, role, avatar_url, created_at, updated_at",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}

export function formatProfileLocation(profile: Profile | null): string | null {
  if (!profile) return null;

  const parts = [profile.cidade, profile.pais].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

export function getProfileInitial(
  profile: Profile | null,
  fallbackName?: string | null,
): string {
  const name = profile?.nome_completo ?? fallbackName;
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}
