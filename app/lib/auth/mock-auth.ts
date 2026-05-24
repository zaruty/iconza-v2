import { saveSession } from "./session";
import type {
  AuthResult,
  AuthSession,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from "./types";

const MOCK_DELAY_MS = 1200;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createSession(
  email: string,
  provider: AuthSession["provider"],
  name?: string,
): AuthSession {
  return {
    user: {
      id: `mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      email,
      name,
    },
    provider,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function persist(result: AuthResult): AuthResult {
  if (result.success && result.session) {
    saveSession(result.session);
  }
  return result;
}

/** Mock — substituir por Supabase Auth */
export async function signInWithEmail(input: SignInInput): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  if (!validateEmail(input.email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  if (input.password.length < 6) {
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres." };
  }

  return persist({
    success: true,
    session: createSession(input.email, "email"),
  });
}

/** Mock — substituir por Supabase Auth */
export async function signUpWithEmail(input: SignUpInput): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  if (!input.name.trim()) {
    return { success: false, error: "Informe seu nome." };
  }

  if (!validateEmail(input.email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  if (input.password.length < 6) {
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres." };
  }

  return persist({
    success: true,
    session: createSession(input.email, "email", input.name.trim()),
  });
}

/** Mock — substituir por Supabase resetPasswordForEmail */
export async function resetPassword(
  input: ResetPasswordInput,
): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  if (!validateEmail(input.email)) {
    return { success: false, error: "Informe um e-mail válido." };
  }

  return { success: true };
}

/** Mock — substituir por Supabase signInWithOAuth({ provider: 'google' }) */
export async function signInWithGoogle(): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  return persist({
    success: true,
    session: createSession("usuario@gmail.com", "google", "Usuário Google"),
  });
}
