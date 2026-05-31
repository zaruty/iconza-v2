import { NextResponse } from "next/server";
import { getProfile } from "@/app/lib/auth/get-profile";
import { isCmsEditorRole, isPanelRole } from "@/app/lib/auth/profile-types";
import { ADMIN_ROUTES } from "@/app/lib/admin/routes";
import { createClient } from "@/app/lib/supabase/server";

function isAdminCallback(next: string) {
  return (
    next === ADMIN_ROUTES.dashboard ||
    next.startsWith("/admin/dashboard") ||
    next === ADMIN_ROUTES.resetPassword
  );
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (isAdminCallback(next)) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const profile = await getProfile(user.id, supabase);
          const isRecoveryFlow = next === ADMIN_ROUTES.resetPassword;
          const roleAllowed = isRecoveryFlow
            ? profile && isPanelRole(profile.role)
            : profile && isCmsEditorRole(profile.role);

          if (!roleAllowed) {
            await supabase.auth.signOut();
            return NextResponse.redirect(`${origin}${ADMIN_ROUTES.home}`);
          }
        }

        return NextResponse.redirect(`${origin}${next}`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  if (isAdminCallback(next)) {
    return NextResponse.redirect(
      `${origin}${ADMIN_ROUTES.login}?error=auth_callback`,
    );
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
