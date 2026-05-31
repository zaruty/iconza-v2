import type { PanelRole } from "@/app/lib/auth/profile-types";

/** Role administrativa exposta no painel ADM (exclui student). */
export type AdminRole = PanelRole;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface AdminSession {
  user: AdminUser;
  remember: boolean;
  expiresAt: number;
}

export interface AdminAuthResult {
  success: boolean;
  error?: string;
  session?: AdminSession;
  /** Utilizador autenticado mas sem role CMS — redirecionar para home. */
  denied?: boolean;
}

export interface AdminSignInInput {
  email: string;
  password: string;
  remember?: boolean;
}
