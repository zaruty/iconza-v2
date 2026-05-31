export const HOME = "/" as const;

export const ADMIN_ROUTES = {
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  recoverPassword: "/admin/recuperar-senha",
  resetPassword: "/admin/redefinir-senha",
  home: HOME,
} as const;

export function adminOAuthCallbackUrl(origin: string): string {
  const next = encodeURIComponent(ADMIN_ROUTES.dashboard);
  return `${origin}/auth/callback?next=${next}`;
}
