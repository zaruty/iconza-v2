import type { NavItem, Notificacao } from "./dashboard-types";

export const NAV: NavItem[] = [
  { id: "inicio", label: "Início", color: "#6B8FC7", iconKey: "home" },
  { id: "perfil", label: "Perfil", color: "#D4688A", iconKey: "user" },
  { id: "universos", label: "Universos", color: "#7A5CCF", iconKey: "planet" },
  { id: "cerebro", label: "Cérebro", color: "#F43F5E", iconKey: "brain" },
  { id: "iconplay", label: "ICONPLAY", color: "#8B5CF6", iconKey: "trophy" },
  { id: "apoio", label: "Eu Apoio", color: "#E0A11B", iconKey: "heart" },
  { id: "ia", label: "IA ICONZA", color: "#C26D8C", iconKey: "bot" },
  { id: "cursos", label: "Cursos", color: "#52B87A", iconKey: "graduate" },
  { id: "colecoes", label: "Coleções", color: "#6B8FC7", iconKey: "bookmark" },
  { id: "marketplace", label: "Marketplace", color: "#D97832", iconKey: "bag" },
  { id: "configuracoes", label: "Config", color: "#8E99A8", iconKey: "settings" },
];

export const NOTIFICACOES: Notificacao[] = [
  { id: 1, tipo: "conquista", msg: "Desbloqueaste a conquista Raiz Viva!", tempo: "2h", lida: false, icon: "🍃", color: "#52B87A" },
  { id: 2, tipo: "aula", msg: "Sua próxima aula em ICONMIND está pronta", tempo: "4h", lida: false, icon: "▶️", color: "#6B8FC7" },
  { id: 3, tipo: "evento", msg: "Mentoria começa em 2 horas!", tempo: "2h", lida: false, icon: "🎙️", color: "#C26D8C" },
  { id: 4, tipo: "social", msg: "Amara Silva comentou no seu mural", tempo: "1d", lida: true, icon: "💬", color: "#7A5CCF" },
  { id: 5, tipo: "progresso", msg: "Você está a 32% do ICONETNIA. Continue!", tempo: "2d", lida: true, icon: "🪐", color: "#E0A11B" },
];
