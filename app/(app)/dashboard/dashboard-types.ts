import type { Dispatch, ReactNode, SetStateAction } from "react";

export type PageId =
  | "inicio"
  | "perfil"
  | "universos"
  | "cerebro"
  | "iconplay"
  | "apoio"
  | "ia"
  | "cursos"
  | "colecoes"
  | "marketplace"
  | "configuracoes";

export type IconKey = string;

export type NavItem = {
  id: PageId;
  label: string;
  color: string;
  iconKey: IconKey;
};

export type Notificacao = {
  id: number;
  tipo: string;
  msg: string;
  tempo: string;
  lida: boolean;
  icon: string;
  color: string;
};

export type TooltipSide = "left" | "right";

export type DashboardLayoutProps = {
  page: PageId;
  setPage: Dispatch<SetStateAction<PageId>>;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  introComplete: boolean;
  setIntroComplete: Dispatch<SetStateAction<boolean>>;
  notifs: Notificacao[];
  setNotifs: Dispatch<SetStateAction<Notificacao[]>>;
  notifOpen: boolean;
  setNotifOpen: Dispatch<SetStateAction<boolean>>;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  children: ReactNode;
};

export const MOBILE_NAV_IDS: PageId[] = [
  "inicio",
  "universos",
  "cerebro",
  "perfil",
  "configuracoes",
];
