"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { getProfile } from "@/app/lib/auth/get-profile";
import { isCmsEditorRole } from "@/app/lib/auth/profile-types";
import { ADMIN_ROUTES } from "@/app/lib/admin/routes";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        router.replace(ADMIN_ROUTES.login);
        return;
      }

      const profile = await getProfile(user.id, supabase);

      if (!profile || !isCmsEditorRole(profile.role)) {
        await supabase.auth.signOut();
        router.replace(ADMIN_ROUTES.home);
        return;
      }

      setReady(true);
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="admin-loading auth-viewport-min">
        <span
          className="admin-spinner admin-spinner--lg"
          aria-label="Carregando painel"
        />
      </div>
    );
  }

  return children;
}
