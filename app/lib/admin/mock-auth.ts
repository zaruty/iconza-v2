import { clearAdminSession, saveAdminSession } from "./session";
import type { AdminAuthResult, AdminSession, AdminSignInInput } from "./types";

const MOCK_DELAY_MS = 900;

/** Mock — substituir por auth server-side (Supabase service role / RBAC) */
const MOCK_ADMIN = {
  email: "admin@iconza.com",
  password: "iconza-admin",
  user: {
    id: "admin_001",
    email: "admin@iconza.com",
    name: "Administrador ICONZA",
    role: "superadmin" as const,
  },
};

const SESSION_SHORT_MS = 1000 * 60 * 60 * 8;
const SESSION_REMEMBER_MS = 1000 * 60 * 60 * 24 * 30;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createSession(
  remember: boolean,
): AdminSession {
  return {
    user: MOCK_ADMIN.user,
    remember,
    expiresAt: Date.now() + (remember ? SESSION_REMEMBER_MS : SESSION_SHORT_MS),
  };
}

/** Mock — credenciais de desenvolvimento; nunca usar em produção */
export async function signInAdmin(
  input: AdminSignInInput,
): Promise<AdminAuthResult> {
  await delay(MOCK_DELAY_MS);

  if (!validateEmail(input.email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  if (!input.password.trim()) {
    return { success: false, error: "Informe sua senha." };
  }

  const emailMatch =
    input.email.trim().toLowerCase() === MOCK_ADMIN.email.toLowerCase();
  const passwordMatch = input.password === MOCK_ADMIN.password;

  if (!emailMatch || !passwordMatch) {
    return { success: false, error: "Credenciais administrativas inválidas." };
  }

  const session = createSession(Boolean(input.remember));
  saveAdminSession(session);

  return { success: true, session };
}

export async function signOutAdmin(): Promise<void> {
  await delay(200);
  clearAdminSession();
}
