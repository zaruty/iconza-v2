import type { AuthSession } from "./types";

const SESSION_KEY = "iconza_mock_session";

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
