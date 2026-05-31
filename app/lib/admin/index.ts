export type {
  AdminAuthResult,
  AdminRole,
  AdminSession,
  AdminSignInInput,
  AdminUser,
} from "./types";

export {
  ADMIN_MODULES,
  ADMIN_MODULE_CATEGORIES,
  ADMIN_NAV_ITEMS,
  getModulesByCategory,
} from "./modules";
export type {
  AdminModule,
  AdminModuleCategory,
  AdminModuleIcon,
  AdminModuleStatus,
} from "./modules";

export { AGENT_IDS, isAgentId } from "./agents";
export type { AgentId } from "./agents";

export { ADMIN_ROUTES, adminOAuthCallbackUrl } from "./routes";

export {
  getAdminClientUser,
  profileToAdminUser,
  resetAdminPassword,
  signInAdmin,
  signInAdminWithGoogle,
  signOutAdmin,
} from "./supabase-auth";

export {
  getAdminPanelUser,
  requireAdminPanelUser,
  requireCmsEditor,
  requirePlatformAdmin,
} from "./require-admin";
