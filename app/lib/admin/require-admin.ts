import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getProfile } from "@/app/lib/auth/get-profile";
import {
  isCmsEditorRole,
  isPanelRole,
  isPlatformAdminRole,
  type PanelRole,
  type Profile,
  type ProfileRole,
} from "@/app/lib/auth/profile-types";
import { ADMIN_ROUTES } from "./routes";
import type { AdminUser } from "./types";

export class AdminAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAuthError";
  }
}

function profileToAdminUser(profile: Profile, role: PanelRole): AdminUser {
  return {
    id: profile.id,
    email: profile.email ?? "",
    name: profile.nome_completo ?? profile.email ?? "Administrador",
    role,
  };
}

async function getAuthenticatedProfile(): Promise<Profile> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AdminAuthError("Sessão não autenticada.");
  }

  const profile = await getProfile(user.id, supabase);

  if (!profile) {
    throw new AdminAuthError("Perfil não encontrado.");
  }

  return profile;
}

export async function getAdminPanelUser(): Promise<AdminUser | null> {
  try {
    const profile = await getAuthenticatedProfile();
    if (!isPanelRole(profile.role)) return null;
    return profileToAdminUser(profile, profile.role);
  } catch {
    return null;
  }
}

export async function requireAdminPanelUser(): Promise<AdminUser> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(ADMIN_ROUTES.login);
  }

  const profile = await getProfile(user.id, supabase);

  if (!profile || !isPanelRole(profile.role)) {
    redirect(ADMIN_ROUTES.login);
  }

  return profileToAdminUser(profile, profile.role);
}

export async function requireCmsEditor(): Promise<AdminUser> {
  const profile = await getAuthenticatedProfile();

  if (!isCmsEditorRole(profile.role)) {
    throw new AdminAuthError("Permissão insuficiente para editar conteúdo.");
  }

  return profileToAdminUser(profile, profile.role);
}

export async function requirePlatformAdmin(): Promise<AdminUser> {
  const profile = await getAuthenticatedProfile();

  if (!isPlatformAdminRole(profile.role)) {
    throw new AdminAuthError("Permissão insuficiente para esta operação.");
  }

  return profileToAdminUser(profile, profile.role);
}

export function assertRoleAllowed(
  role: ProfileRole,
  allowed: ProfileRole[],
): void {
  if (!allowed.includes(role)) {
    throw new AdminAuthError("Permissão insuficiente.");
  }
}
