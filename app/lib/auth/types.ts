export type AuthProvider = "email" | "google";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: AuthUser;
  provider: AuthProvider;
  expiresAt: number;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: AuthSession;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  email: string;
}
