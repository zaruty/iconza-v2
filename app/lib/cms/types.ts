import type {
  CmsEditorRole,
  PanelRole,
  PlatformAdminRole,
  ProfileRole,
} from "@/app/lib/auth/profile-types";
import {
  CMS_EDITOR_ROLES,
  PANEL_ROLES,
  PLATFORM_ADMIN_ROLES,
} from "@/app/lib/auth/profile-types";

export type { CmsEditorRole, PanelRole, PlatformAdminRole, ProfileRole };
export { CMS_EDITOR_ROLES, PANEL_ROLES, PLATFORM_ADMIN_ROLES };

// ---------------------------------------------------------------------------
// home_sections
// ---------------------------------------------------------------------------

export const HOME_SECTION_TYPES = [
  "hero",
  "eventos",
  "comunidade",
  "universos",
] as const;

export type HomeSectionType = (typeof HOME_SECTION_TYPES)[number];

export const CURRENT_SECTION_SCHEMA_VERSION = 1;

export interface HeroSectionProps {
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  subtitle: string;
  cta_text: string;
  cta_url: string;
  background_media_id: string | null;
  featured_video_id: string | null;
}

export interface EventoItem {
  id: string;
  title: string;
  date: string;
  description: string;
  media_id: string | null;
  cta_url: string | null;
}

export interface EventosSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: EventoItem[];
}

export interface ComunidadeHighlight {
  id: string;
  title: string;
  description: string;
  media_id: string | null;
}

export interface ComunidadeSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: ComunidadeHighlight[];
  featured_video_id: string | null;
}

export interface UniversoCard {
  name: string;
  tagline: string;
  description: string;
  accent: string;
}

export interface UniversosSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: UniversoCard[];
}

export type SectionPropsMap = {
  hero: HeroSectionProps;
  eventos: EventosSectionProps;
  comunidade: ComunidadeSectionProps;
  universos: UniversosSectionProps;
};

export interface HomeSectionRow<T extends HomeSectionType = HomeSectionType> {
  id: string;
  type: T;
  order_index: number;
  visible: boolean;
  props_json: SectionPropsMap[T];
  schema_version: number;
  updated_at: string;
  updated_by: string | null;
}

// ---------------------------------------------------------------------------
// visual_themes → CSS variables
// ---------------------------------------------------------------------------

export const BACKGROUND_TYPES = [
  "aurora",
  "particles",
  "gradient",
  "clean",
] as const;

export type BackgroundType = (typeof BACKGROUND_TYPES)[number];

export const PARTICLE_DENSITIES = ["none", "low", "medium", "high"] as const;
export type ParticleDensity = (typeof PARTICLE_DENSITIES)[number];

export const FONT_MODES = ["editorial", "modern", "display"] as const;
export type FontMode = (typeof FONT_MODES)[number];

export interface VisualThemeRow {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  glow_color: string;
  accent_color: string;
  background_color: string;
  glass_color: string;
  border_glow_color: string;
  background_type: BackgroundType;
  particle_density: ParticleDensity;
  font_mode: FontMode;
  is_active: boolean;
  scheduled_at: string | null;
  expires_at: string | null;
  created_at: string;
}

/** Mapeamento 1:1 para CSS custom properties na vitrine */
export interface ThemeCssVariables {
  "--primary": string;
  "--secondary": string;
  "--glow": string;
  "--background": string;
  "--accent": string;
  "--glass": string;
  "--border-glow": string;
}

// ---------------------------------------------------------------------------
// system_settings
// ---------------------------------------------------------------------------

export type SystemSettingKey =
  | "maintenance_mode"
  | "onboarding_enabled"
  | "splash_enabled"
  | "active_theme_id";

export interface SystemSettingRow {
  id: string;
  key: SystemSettingKey | string;
  value: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// media_library
// ---------------------------------------------------------------------------

export const MEDIA_TYPES = ["image", "video", "banner", "hologram"] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration_seconds?: number;
  mime_type?: string;
  file_size_bytes?: number;
  [key: string]: unknown;
}

export interface MediaLibraryRow {
  id: string;
  url: string;
  type: MediaType;
  alt_text: string;
  category: string;
  dominant_color: string | null;
  blurhash: string | null;
  aspect_ratio: number | null;
  metadata: MediaMetadata;
  created_at: string;
}

