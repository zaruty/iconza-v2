"use client";

import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { getProfile } from "./get-profile";
import type { Profile } from "./profile-types";
import { signOut as supabaseSignOut } from "./supabase-auth";

function resolveDisplayName(user: User | null, profile: Profile | null): string {
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

export function useUser() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (userId: string) => {
      const nextProfile = await getProfile(userId, supabase);
      setProfile(nextProfile);
    },
    [supabase],
  );

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser.id);
      }

      if (mounted) {
        setLoading(false);
      }
    }

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);

      if (nextUser) {
        await loadProfile(nextUser.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile, supabase]);

  const signOut = useCallback(async () => {
    await supabaseSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  const displayName = resolveDisplayName(user, profile);
  const firstName = displayName.split(/\s+/)[0] ?? displayName;

  return {
    user,
    profile,
    loading,
    signOut,
    displayName,
    firstName,
  };
}
