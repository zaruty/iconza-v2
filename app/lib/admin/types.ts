export type AdminRole = "superadmin" | "editor" | "analyst";

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
}

export interface AdminSignInInput {
  email: string;
  password: string;
  remember?: boolean;
}
