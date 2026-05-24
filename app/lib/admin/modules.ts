export type AdminModuleStatus = "active" | "coming-soon" | "disabled";

export type AdminModuleCategory =
  | "content"
  | "platform"
  | "business"
  | "people";

export interface AdminModule {
  id: string;
  title: string;
  description: string;
  href: string;
  category: AdminModuleCategory;
  status: AdminModuleStatus;
  icon: AdminModuleIcon;
}

export type AdminModuleIcon =
  | "universes"
  | "lessons"
  | "quiz"
  | "users"
  | "analytics"
  | "uploads"
  | "backgrounds"
  | "themes"
  | "monetization";

export const ADMIN_MODULE_CATEGORIES: Record<
  AdminModuleCategory,
  { label: string; description: string }
> = {
  content: {
    label: "Conteúdo",
    description: "Universos, aulas e avaliações",
  },
  platform: {
    label: "Plataforma",
    description: "Assets visuais e configurações",
  },
  business: {
    label: "Negócio",
    description: "Receita e métricas",
  },
  people: {
    label: "Pessoas",
    description: "Usuários e permissões",
  },
};

/** Registro central de módulos — expandir conforme novas rotas forem criadas */
export const ADMIN_MODULES: AdminModule[] = [
  {
    id: "universes",
    title: "Universos",
    description: "Gerenciar ICONMIND, ICONLOVE, ICONETNIA e demais mundos.",
    href: "/admin/dashboard/universos",
    category: "content",
    status: "coming-soon",
    icon: "universes",
  },
  {
    id: "lessons",
    title: "Aulas",
    description: "Criar trilhas, módulos e conteúdo educacional.",
    href: "/admin/dashboard/aulas",
    category: "content",
    status: "coming-soon",
    icon: "lessons",
  },
  {
    id: "quiz",
    title: "Quiz Builder",
    description: "Montar quizzes, desafios e avaliações interativas.",
    href: "/admin/dashboard/quiz",
    category: "content",
    status: "coming-soon",
    icon: "quiz",
  },
  {
    id: "users",
    title: "Usuários",
    description: "Contas, progresso, roles e moderação.",
    href: "/admin/dashboard/usuarios",
    category: "people",
    status: "coming-soon",
    icon: "users",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Engajamento, retenção e funis de conversão.",
    href: "/admin/dashboard/analytics",
    category: "business",
    status: "coming-soon",
    icon: "analytics",
  },
  {
    id: "uploads",
    title: "Uploads",
    description: "Biblioteca de mídia, ícones e assets gerados.",
    href: "/admin/dashboard/uploads",
    category: "platform",
    status: "coming-soon",
    icon: "uploads",
  },
  {
    id: "backgrounds",
    title: "Backgrounds",
    description: "Atmospheres, partículas e camadas visuais.",
    href: "/admin/dashboard/backgrounds",
    category: "platform",
    status: "coming-soon",
    icon: "backgrounds",
  },
  {
    id: "themes",
    title: "Temas",
    description: "Paletas, tipografia e identidade por universo.",
    href: "/admin/dashboard/temas",
    category: "platform",
    status: "coming-soon",
    icon: "themes",
  },
  {
    id: "monetization",
    title: "Monetização",
    description: "Planos, assinaturas e billing.",
    href: "/admin/dashboard/monetizacao",
    category: "business",
    status: "coming-soon",
    icon: "monetization",
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    id: "overview",
    label: "Visão geral",
    href: "/admin/dashboard",
    icon: "overview" as const,
  },
  ...ADMIN_MODULES.map((module) => ({
    id: module.id,
    label: module.title,
    href: module.href,
    icon: module.icon,
    status: module.status,
  })),
];

export function getModulesByCategory(category: AdminModuleCategory) {
  return ADMIN_MODULES.filter((module) => module.category === category);
}
