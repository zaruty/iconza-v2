"use client";

import type { User } from "@supabase/supabase-js";
import { createContext } from "react";
import type { Profile } from "./profile-types";

export type UserContextValue = {
  user: User | null;
  profile: Profile | null;
  /** True until the initial auth session is resolved. */
  authLoading: boolean;
  /** True while a profiles row fetch is in flight. */
  profileLoading: boolean;
  /** @deprecated Prefer authLoading — kept for callers that gate on session only. */
  loading: boolean;
  displayName: string;
  firstName: string;
  signOut: () => Promise<void>;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function resolveDisplayName(
  user: User | null,
  profile: Profile | null,
): string {
  if (profile?.nome_completo?.trim()) {
    return profile.nome_completo.trim();
  }

  const metadataName =
    typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user?.user_metadata?.name === "string"
        ? user.user_metadata.name
        : null;

  if (metadataName?.trim()) {
    return metadataName.trim();
  }

  if (user?.email) {
    return user.email.split("@")[0] ?? "Aluna";
  }

  return "Aluna";
}
