export type UniverseStatus = "active" | "available" | "locked";

export type MockUniverse = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: UniverseStatus;
  mastery: number;
  accent: string;
  accentMuted: string;
};

export type MockAchievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
};

export type MockExploreItem = {
  id: string;
  title: string;
  author: string;
  universeId: string;
  universeName: string;
  accent: string;
};

export const MOCK_STUDENT = {
  firstName: "Lívia",
  fullName: "Lívia Zaruty",
  level: "Curadora",
  xp: 350,
  xpGoal: 1000,
  bio: "Criadora de conteúdo e fundadora da ICONZA",
  stats: {
    totalXp: 350,
    universesStarted: 2,
    achievements: 3,
  },
  continueLearning: {
    universeId: "iconmind",
    universeName: "ICONMIND",
    progress: 40,
  },
} as const;

export const MOCK_UNIVERSES: MockUniverse[] = [
  {
    id: "iconmind",
    name: "ICONMIND",
    tagline: "Pensamento visual",
    description: "Transforme ideias complexas em ícones claros com IA.",
    status: "active",
    mastery: 40,
    accent: "#7B88FF",
    accentMuted: "rgba(123, 136, 255, 0.35)",
  },
  {
    id: "iconlove",
    name: "ICONLOVE",
    tagline: "Emoção e conexão",
    description: "Crie símbolos que comunicam afeto e empatia.",
    status: "available",
    mastery: 0,
    accent: "#E8A0BF",
    accentMuted: "rgba(232, 160, 191, 0.35)",
  },
  {
    id: "iconethnia",
    name: "ICONETHNIA",
    tagline: "Cultura e identidade",
    description: "Explore tradições e narrativas visuais diversas.",
    status: "locked",
    mastery: 0,
    accent: "#B39DFF",
    accentMuted: "rgba(179, 157, 255, 0.2)",
  },
  {
    id: "iconfood",
    name: "ICONFOOD",
    tagline: "Sabores em ícone",
    description: "Represente gastronomia e experiências culinárias.",
    status: "locked",
    mastery: 0,
    accent: "#5ECFFF",
    accentMuted: "rgba(94, 207, 255, 0.2)",
  },
  {
    id: "iconart",
    name: "ICONART",
    tagline: "Arte e expressão",
    description: "Mergulhe na estética aplicada ao design de ícones.",
    status: "available",
    mastery: 0,
    accent: "#A9D6FF",
    accentMuted: "rgba(169, 214, 255, 0.35)",
  },
];

export const MOCK_ACHIEVEMENTS: MockAchievement[] = [
  {
    id: "first-stroke",
    name: "Primeiro Traço",
    description: "Finalizou a primeira aula",
    unlocked: true,
  },
  {
    id: "explorer",
    name: "Exploradora",
    description: "Entrou em 2 universos",
    unlocked: true,
  },
  {
    id: "fluid-rhythm",
    name: "Ritmo Fluido",
    description: "7 dias de acesso",
    unlocked: true,
  },
  {
    id: "mind-architect",
    name: "Arquiteta Mental",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
  {
    id: "love-signal",
    name: "Sinal de Afeto",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
  {
    id: "world-traveler",
    name: "Viajante Visual",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
  {
    id: "flavor-alchemist",
    name: "Alquimista de Sabores",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
  {
    id: "gallery-master",
    name: "Mestra da Galeria",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
  {
    id: "curator-crown",
    name: "Coroa Curadora",
    description: "Continue sua jornada para desbloquear",
    unlocked: false,
  },
];

export const MOCK_EXPLORE_ITEMS: MockExploreItem[] = [
  {
    id: "1",
    title: "Ícone de resiliência",
    author: "Marina Costa",
    universeId: "iconmind",
    universeName: "ICONMIND",
    accent: "#7B88FF",
  },
  {
    id: "2",
    title: "Abraço visual",
    author: "Ana Luísa",
    universeId: "iconlove",
    universeName: "ICONLOVE",
    accent: "#E8A0BF",
  },
  {
    id: "3",
    title: "Raízes do cerrado",
    author: "Juliana M.",
    universeId: "iconethnia",
    universeName: "ICONETHNIA",
    accent: "#B39DFF",
  },
  {
    id: "4",
    title: "Tempero lunar",
    author: "Camila Ribeiro",
    universeId: "iconfood",
    universeName: "ICONFOOD",
    accent: "#5ECFFF",
  },
  {
    id: "5",
    title: "Composição etérea",
    author: "Beatriz N.",
    universeId: "iconart",
    universeName: "ICONART",
    accent: "#A9D6FF",
  },
  {
    id: "6",
    title: "Mapa de ideias",
    author: "Fernanda S.",
    universeId: "iconmind",
    universeName: "ICONMIND",
    accent: "#7B88FF",
  },
];

export function getUniverseById(id: string) {
  return MOCK_UNIVERSES.find((u) => u.id === id);
}
