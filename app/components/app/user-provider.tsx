"use client";

import type { User } from "@supabase/supabase-js";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/app/lib/supabase/client";
import { getProfile } from "@/app/lib/auth/get-profile";
import type { Profile } from "@/app/lib/auth/profile-types";
import { signOut as supabaseSignOut } from "@/app/lib/auth/supabase-auth";
import {
  resolveDisplayName,
  UserContext,
  type UserContextValue,
} from "@/app/lib/auth/user-context";

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const profileRequestRef = useRef(0);

  const fetchProfile = useCallback(
    (userId: string) => {
      const requestId = ++profileRequestRef.current;
      setProfileLoading(true);

      void (async () => {
        try {
          const nextProfile = await getProfile(userId, supabase);
          if (profileRequestRef.current !== requestId) return;
          setProfile(nextProfile);
        } finally {
          if (profileRequestRef.current === requestId) {
            setProfileLoading(false);
          }
        }
      })();
    },
    [supabase],
  );

  const applySession = useCallback(
    (nextUser: User | null) => {
      setUser(nextUser);

      if (nextUser) {
        queueMicrotask(() => {
          fetchProfile(nextUser.id);
        });
      } else {
        profileRequestRef.current += 1;
        setProfile(null);
        setProfileLoading(false);
      }
    },
    [fetchProfile],
  );

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      applySession(session?.user ?? null);
      setAuthLoading(false);
    });

    void (async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;
        applySession(session?.user ?? null);
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applySession, supabase]);

  const signOut = useCallback(async () => {
    await supabaseSignOut();
    profileRequestRef.current += 1;
    setUser(null);
    setProfile(null);
    setProfileLoading(false);
  }, []);

  const displayName = resolveDisplayName(user, profile);
  const firstName = displayName.split(/\s+/)[0] ?? displayName;

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      profile,
      authLoading,
      profileLoading,
      loading: authLoading,
      displayName,
      firstName,
      signOut,
    }),
    [user, profile, authLoading, profileLoading, displayName, firstName, signOut],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
