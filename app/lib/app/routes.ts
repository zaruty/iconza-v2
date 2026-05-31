/** Rotas da área pública e do aluno — fonte única de verdade. */
export const HOME = "/" as const;

export const APP_ROUTES = {
  home: HOME,
  login: "/login",
  dashboard: "/dashboard",
  perfil: "/perfil",
  explorar: "/explorar",
  universos: "/universos",
  conquistas: "/conquistas",
  configuracoes: "/configuracoes",
  onboarding: "/onboarding",
  onboardingStep2: "/onboarding/step/2",
  cadastro: "/cadastro",
  recoverPassword: "/recuperar-senha",
} as const;

export const APP_NAV_ROUTES = [
  APP_ROUTES.dashboard,
  APP_ROUTES.perfil,
  APP_ROUTES.explorar,
  APP_ROUTES.universos,
  APP_ROUTES.conquistas,
  APP_ROUTES.configuracoes,
] as const;

export const APP_BARE_ROUTES = [
  APP_ROUTES.onboarding,
  APP_ROUTES.onboardingStep2,
  APP_ROUTES.dashboard,
] as const;
