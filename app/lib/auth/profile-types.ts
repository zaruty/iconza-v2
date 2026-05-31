export const PROFILE_ROLES = [
  "student",
  "admin",
  "editor",
  "analyst",
  "founder",
] as const;

export type ProfileRole = (typeof PROFILE_ROLES)[number];

/** Roles com acesso ao painel administrativo (leitura). */
export const PANEL_ROLES = [
  "admin",
  "editor",
  "analyst",
  "founder",
] as const satisfies readonly ProfileRole[];

export type PanelRole = (typeof PANEL_ROLES)[number];

/** Roles que podem editar conteúdo CMS (requireCmsEditor). */
export const CMS_EDITOR_ROLES = [
  "admin",
  "editor",
  "founder",
] as const satisfies readonly ProfileRole[];

export type CmsEditorRole = (typeof CMS_EDITOR_ROLES)[number];

/** Roles com permissões de plataforma (temas, settings). */
export const PLATFORM_ADMIN_ROLES = [
  "admin",
  "founder",
] as const satisfies readonly ProfileRole[];

export type PlatformAdminRole = (typeof PLATFORM_ADMIN_ROLES)[number];

export type Profile = {
  id: string;
  email: string | null;
  nome_completo: string | null;
  telefone: string | null;
  pais: string | null;
  cidade: string | null;
  role: ProfileRole;
  avatar_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export function isPanelRole(role: ProfileRole): role is PanelRole {
  return (PANEL_ROLES as readonly ProfileRole[]).includes(role);
}

export function isCmsEditorRole(role: ProfileRole): role is CmsEditorRole {
  return (CMS_EDITOR_ROLES as readonly ProfileRole[]).includes(role);
}

export function isPlatformAdminRole(role: ProfileRole): role is PlatformAdminRole {
  return (PLATFORM_ADMIN_ROLES as readonly ProfileRole[]).includes(role);
}
