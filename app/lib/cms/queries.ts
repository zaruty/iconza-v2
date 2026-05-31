import { createClient } from "@/app/lib/supabase/server";
import { parseSectionProps } from "./section-schemas";
import { buildDefaultHomeSections, DEFAULT_VISUAL_THEME } from "./seed-defaults";
import { themeToCssVariables } from "./theme-css";
import type {
  HomeSectionRow,
  HomeSectionType,
  MediaLibraryRow,
  SystemSettingRow,
  ThemeCssVariables,
  VisualThemeRow,
} from "./types";

function mapHomeSectionRow(row: Record<string, unknown>): HomeSectionRow {
  const type = row.type as HomeSectionType;
  return {
    id: String(row.id),
    type,
    order_index: Number(row.order_index),
    visible: Boolean(row.visible),
    props_json: parseSectionProps(type, row.props_json),
    schema_version: Number(row.schema_version ?? 1),
    updated_at: String(row.updated_at),
    updated_by: row.updated_by ? String(row.updated_by) : null,
  };
}

function mapVisualThemeRow(row: Record<string, unknown>): VisualThemeRow {
  return {
    id: String(row.id),
    name: String(row.name),
    primary_color: String(row.primary_color),
    secondary_color: String(row.secondary_color),
    glow_color: String(row.glow_color),
    accent_color: String(row.accent_color ?? row.primary_color),
    background_color: String(row.background_color ?? "#0A0612"),
    glass_color: String(row.glass_color ?? "rgba(255,255,255,0.06)"),
    border_glow_color: String(
      row.border_glow_color ?? "rgba(169,214,255,0.25)",
    ),
    background_type: row.background_type as VisualThemeRow["background_type"],
    particle_density: row.particle_density as VisualThemeRow["particle_density"],
    font_mode: row.font_mode as VisualThemeRow["font_mode"],
    is_active: Boolean(row.is_active),
    scheduled_at: row.scheduled_at ? String(row.scheduled_at) : null,
    expires_at: row.expires_at ? String(row.expires_at) : null,
    created_at: String(row.created_at),
  };
}

export async function getPublicHomeSections(): Promise<HomeSectionRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("home_sections")
    .select("*")
    .eq("visible", true)
    .order("order_index", { ascending: true });

  if (error || !data?.length) {
    return buildDefaultHomeSections().filter((section) => section.visible);
  }

  return data.map((row) => mapHomeSectionRow(row as Record<string, unknown>));
}

export async function getAllHomeSections(): Promise<HomeSectionRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("home_sections")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !data?.length) {
    return buildDefaultHomeSections();
  }

  return data.map((row) => mapHomeSectionRow(row as Record<string, unknown>));
}

export async function getHomeSectionByType(
  type: HomeSectionType,
): Promise<HomeSectionRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("home_sections")
    .select("*")
    .eq("type", type)
    .maybeSingle();

  if (error || !data) {
    const fallback = buildDefaultHomeSections().find((s) => s.type === type);
    return fallback ?? null;
  }

  return mapHomeSectionRow(data as Record<string, unknown>);
}

export async function getActiveVisualTheme(): Promise<VisualThemeRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("visual_themes")
    .select("*")
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return DEFAULT_VISUAL_THEME;
  }

  return mapVisualThemeRow(data as Record<string, unknown>);
}

export async function getActiveThemeCssVariables(): Promise<ThemeCssVariables> {
  const theme = await getActiveVisualTheme();
  return themeToCssVariables(theme);
}

export async function getSystemSettings(): Promise<SystemSettingRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("system_settings").select("*");

  if (error || !data) return [];
  return data as SystemSettingRow[];
}

export async function getMediaById(id: string): Promise<MediaLibraryRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_library")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as MediaLibraryRow;
}
