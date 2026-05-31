import { createClient } from "@/app/lib/supabase/client";
import { getProfile } from "@/app/lib/auth/get-profile";
import { isCmsEditorRole } from "@/app/lib/auth/profile-types";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AdminAuthResult, AdminSignInInput, AdminUser } from "./types";
import { ADMIN_ROUTES } from "./routes";

function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar.";
  }

  return "Não foi possível autenticar.";
}

export async function profileToAdminUser(
  userId: string,
  supabase?: SupabaseClient,
): Promise<AdminUser | null> {
  const client = supabase ?? createClient();
  const profile = await getProfile(userId, client);

  if (!profile || !isCmsEditorRole(profile.role)) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email ?? "",
    name: profile.nome_completo ?? profile.email ?? "Administrador",
    role: profile.role,
  };
}

export async function getAdminClientUser(): Promise<AdminUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return profileToAdminUser(user.id, supabase);
}

async function rejectNonEditorAccess(supabase: SupabaseClient): Promise<void> {
  await supabase.auth.signOut();
}

export async function signInAdmin(
  input: AdminSignInInput,
): Promise<AdminAuthResult> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      error: mapAuthError(error?.message ?? "Credenciais inválidas."),
    };
  }

  const adminUser = await profileToAdminUser(data.user.id, supabase);

  if (!adminUser) {
    await rejectNonEditorAccess(supabase);
    return {
      success: false,
      denied: true,
      error: "Esta conta não possui acesso ao painel administrativo.",
    };
  }

  return { success: true };
}

export async function signInAdminWithGoogle(
  redirectTo: string,
): Promise<AdminAuthResult> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    return {
      success: false,
      error: "Não foi possível conectar com Google.",
    };
  }

  return { success: true };
}

export async function resetAdminPassword(email: string): Promise<AdminAuthResult> {
  const supabase = createClient();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(ADMIN_ROUTES.resetPassword)}`;

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  });

  if (error) {
    return {
      success: false,
      error: "Não foi possível enviar o link de recuperação.",
    };
  }

  return { success: true };
}

export async function getAdminRecoverySession(): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Boolean(user);
}

export async function updateAdminPassword(
  password: string,
): Promise<AdminAuthResult> {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      success: false,
      error: "Não foi possível redefinir a senha.",
    };
  }

  return { success: true };
}

export async function signOutAdmin(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
