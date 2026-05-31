-- ICONZA v2 — CMS Foundation
-- Fase 0: tabelas, RLS, roles, storage, seed

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES: role padronizado
-- ============================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'student';

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('student', 'admin', 'editor', 'analyst'));

-- ============================================================
-- HELPERS RLS
-- ============================================================
CREATE OR REPLACE FUNCTION public.has_panel_role(allowed_roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = ANY (allowed_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_cms_editor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_panel_role(ARRAY['admin', 'editor']);
$$;

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_panel_role(ARRAY['admin']);
$$;

-- ============================================================
-- updated_at helper
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- 1. system_settings
-- ============================================================
CREATE TABLE IF NOT EXISTS public.system_settings (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key        text NOT NULL UNIQUE,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_system_settings_key
  ON public.system_settings (key);

DROP TRIGGER IF EXISTS trg_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER trg_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- 2. visual_themes (mapeia para CSS variables no front-end)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.visual_themes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text NOT NULL,
  primary_color     text NOT NULL DEFAULT '#B39DFF',   -- --primary
  secondary_color   text NOT NULL DEFAULT '#7B88FF',   -- --secondary
  glow_color        text NOT NULL DEFAULT '#A9D6FF',   -- --glow
  accent_color      text NOT NULL DEFAULT '#E8B4FF',   -- --accent
  background_color  text NOT NULL DEFAULT '#0A0612',   -- --background
  glass_color       text NOT NULL DEFAULT 'rgba(255,255,255,0.06)', -- --glass
  border_glow_color text NOT NULL DEFAULT 'rgba(169,214,255,0.25)', -- --border-glow
  background_type   text NOT NULL DEFAULT 'aurora'
                    CHECK (background_type IN ('aurora', 'particles', 'gradient', 'clean')),
  particle_density  text NOT NULL DEFAULT 'medium'
                    CHECK (particle_density IN ('none', 'low', 'medium', 'high')),
  font_mode         text NOT NULL DEFAULT 'editorial'
                    CHECK (font_mode IN ('editorial', 'modern', 'display')),
  is_active         boolean NOT NULL DEFAULT false,
  scheduled_at      timestamptz,
  expires_at        timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_visual_themes_single_active
  ON public.visual_themes (is_active)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_visual_themes_schedule
  ON public.visual_themes (scheduled_at, expires_at)
  WHERE scheduled_at IS NOT NULL OR expires_at IS NOT NULL;

-- ============================================================
-- 3. home_sections
-- ============================================================
CREATE TABLE IF NOT EXISTS public.home_sections (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type           text NOT NULL
                 CHECK (type IN ('hero', 'eventos', 'comunidade', 'universos')),
  order_index    integer NOT NULL DEFAULT 0,
  visible        boolean NOT NULL DEFAULT true,
  props_json     jsonb NOT NULL DEFAULT '{}'::jsonb,
  schema_version integer NOT NULL DEFAULT 1,
  updated_at     timestamptz NOT NULL DEFAULT now(),
  updated_by     uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  UNIQUE (type)
);

CREATE INDEX IF NOT EXISTS idx_home_sections_order
  ON public.home_sections (order_index);

CREATE OR REPLACE FUNCTION public.set_home_section_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  IF auth.uid() IS NOT NULL THEN
    NEW.updated_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_home_sections_audit ON public.home_sections;
CREATE TRIGGER trg_home_sections_audit
  BEFORE INSERT OR UPDATE ON public.home_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_home_section_audit();

-- ============================================================
-- 4. media_library
-- ============================================================
CREATE TABLE IF NOT EXISTS public.media_library (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url            text NOT NULL,
  type           text NOT NULL
                 CHECK (type IN ('image', 'video', 'banner', 'hologram')),
  alt_text       text NOT NULL DEFAULT '',
  category       text NOT NULL DEFAULT 'general',
  dominant_color text,
  blurhash       text,
  aspect_ratio   numeric(10, 4),
  metadata       jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_library_type
  ON public.media_library (type);

CREATE INDEX IF NOT EXISTS idx_media_library_category
  ON public.media_library (category);

-- ============================================================
-- Tema sazonal: ativação automática
-- ============================================================
CREATE OR REPLACE FUNCTION public.sync_scheduled_themes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  theme_to_activate uuid;
BEGIN
  UPDATE public.visual_themes
  SET is_active = false
  WHERE is_active = true
    AND expires_at IS NOT NULL
    AND expires_at <= now();

  SELECT id INTO theme_to_activate
  FROM public.visual_themes
  WHERE scheduled_at IS NOT NULL
    AND scheduled_at <= now()
    AND (expires_at IS NULL OR expires_at > now())
  ORDER BY scheduled_at DESC
  LIMIT 1;

  IF theme_to_activate IS NOT NULL THEN
    UPDATE public.visual_themes SET is_active = false WHERE is_active = true;
    UPDATE public.visual_themes SET is_active = true WHERE id = theme_to_activate;

    INSERT INTO public.system_settings (key, value)
    VALUES ('active_theme_id', theme_to_activate::text)
    ON CONFLICT (key) DO UPDATE
      SET value = EXCLUDED.value, updated_at = now();
  END IF;
END;
$$;

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visual_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- system_settings
DROP POLICY IF EXISTS "public_read_system_settings" ON public.system_settings;
CREATE POLICY "public_read_system_settings" ON public.system_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_write_system_settings" ON public.system_settings;
CREATE POLICY "admin_write_system_settings" ON public.system_settings
  FOR ALL
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

-- visual_themes
DROP POLICY IF EXISTS "public_read_visual_themes" ON public.visual_themes;
CREATE POLICY "public_read_visual_themes" ON public.visual_themes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_write_visual_themes" ON public.visual_themes;
CREATE POLICY "admin_write_visual_themes" ON public.visual_themes
  FOR ALL
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

-- home_sections
DROP POLICY IF EXISTS "public_read_visible_home_sections" ON public.home_sections;
CREATE POLICY "public_read_visible_home_sections" ON public.home_sections
  FOR SELECT USING (visible = true);

DROP POLICY IF EXISTS "panel_read_all_home_sections" ON public.home_sections;
CREATE POLICY "panel_read_all_home_sections" ON public.home_sections
  FOR SELECT USING (public.has_panel_role(ARRAY['admin', 'editor', 'analyst']));

DROP POLICY IF EXISTS "cms_editors_write_home_sections" ON public.home_sections;
CREATE POLICY "cms_editors_write_home_sections" ON public.home_sections
  FOR INSERT
  WITH CHECK (public.is_cms_editor());

DROP POLICY IF EXISTS "cms_editors_update_home_sections" ON public.home_sections;
CREATE POLICY "cms_editors_update_home_sections" ON public.home_sections
  FOR UPDATE
  USING (public.is_cms_editor())
  WITH CHECK (public.is_cms_editor());

DROP POLICY IF EXISTS "cms_editors_delete_home_sections" ON public.home_sections;
CREATE POLICY "cms_editors_delete_home_sections" ON public.home_sections
  FOR DELETE
  USING (public.is_cms_editor());

-- media_library
DROP POLICY IF EXISTS "public_read_media_library" ON public.media_library;
CREATE POLICY "public_read_media_library" ON public.media_library
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "cms_editors_write_media_library" ON public.media_library;
CREATE POLICY "cms_editors_write_media_library" ON public.media_library
  FOR INSERT
  WITH CHECK (public.is_cms_editor());

DROP POLICY IF EXISTS "cms_editors_update_media_library" ON public.media_library;
CREATE POLICY "cms_editors_update_media_library" ON public.media_library
  FOR UPDATE
  USING (public.is_cms_editor())
  WITH CHECK (public.is_cms_editor());

DROP POLICY IF EXISTS "cms_editors_delete_media_library" ON public.media_library;
CREATE POLICY "cms_editors_delete_media_library" ON public.media_library
  FOR DELETE
  USING (public.is_cms_editor());

-- ============================================================
-- STORAGE: media-library bucket
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-library',
  'media-library',
  true,
  52428800,
  ARRAY[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'video/mp4', 'video/webm'
  ]
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_media_storage" ON storage.objects;
CREATE POLICY "public_read_media_storage" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media-library');

DROP POLICY IF EXISTS "cms_editors_upload_media_storage" ON storage.objects;
CREATE POLICY "cms_editors_upload_media_storage" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media-library'
    AND public.is_cms_editor()
  );

DROP POLICY IF EXISTS "cms_editors_update_media_storage" ON storage.objects;
CREATE POLICY "cms_editors_update_media_storage" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'media-library' AND public.is_cms_editor())
  WITH CHECK (bucket_id = 'media-library' AND public.is_cms_editor());

DROP POLICY IF EXISTS "cms_editors_delete_media_storage" ON storage.objects;
CREATE POLICY "cms_editors_delete_media_storage" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'media-library' AND public.is_cms_editor());

-- ============================================================
-- SEED
-- ============================================================
INSERT INTO public.system_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('onboarding_enabled', 'true'),
  ('splash_enabled', 'false'),
  ('active_theme_id', '')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.visual_themes (
  name,
  primary_color,
  secondary_color,
  glow_color,
  accent_color,
  background_color,
  glass_color,
  border_glow_color,
  background_type,
  particle_density,
  font_mode,
  is_active
)
SELECT
  'Editorial',
  '#B39DFF',
  '#7B88FF',
  '#A9D6FF',
  '#E8B4FF',
  '#0A0612',
  'rgba(255,255,255,0.06)',
  'rgba(169,214,255,0.25)',
  'aurora',
  'medium',
  'editorial',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.visual_themes WHERE name = 'Editorial'
);

UPDATE public.system_settings ss
SET value = vt.id::text, updated_at = now()
FROM public.visual_themes vt
WHERE ss.key = 'active_theme_id'
  AND vt.is_active = true
  AND (ss.value IS NULL OR ss.value = '');

INSERT INTO public.home_sections (type, order_index, visible, props_json, schema_version) VALUES
(
  'hero',
  0,
  true,
  '{
    "title_line1": "Universos",
    "title_line2": "para mentes",
    "title_highlight": "criativas",
    "subtitle": "Explore experiências visuais e universos temáticos que desenvolvem criatividade, emoção e inteligência estratégica.",
    "cta_text": "Explorar universos",
    "cta_url": "/cadastro",
    "background_media_id": null,
    "featured_video_id": null
  }'::jsonb,
  1
),
(
  'eventos',
  1,
  true,
  '{
    "eyebrow": "Eventos",
    "title": "Próximos encontros",
    "subtitle": "Workshops, lives e experiências ao vivo.",
    "items": []
  }'::jsonb,
  1
),
(
  'comunidade',
  2,
  true,
  '{
    "eyebrow": "Comunidade",
    "title": "Criadoras em movimento",
    "subtitle": "Histórias, destaques e conquistas da comunidade ICONZA.",
    "highlights": [],
    "featured_video_id": null
  }'::jsonb,
  1
),
(
  'universos',
  3,
  true,
  '{
    "eyebrow": "Universos",
    "title": "Cinco mundos para explorar",
    "subtitle": "Cada universo ICONZA é um caminho de aprendizado focado em um domínio criativo diferente.",
    "cards": [
      {"name":"ICONMIND","tagline":"Pensamento visual","description":"Transforme ideias complexas em ícones claros. Aprenda a sintetizar conceitos com IA.","accent":"from-iconza-lilac/20 to-transparent"},
      {"name":"ICONLOVE","tagline":"Emoção e conexão","description":"Crie símbolos que comunicam afeto, empatia e relações humanas de forma única.","accent":"from-iconza-pink/10 to-transparent"},
      {"name":"ICONETNIA","tagline":"Cultura e identidade","description":"Explore tradições, diversidade e narrativas visuais de diferentes povos e origens.","accent":"from-iconza-lavender/15 to-transparent"},
      {"name":"ICONFOOD","tagline":"Sabores em ícone","description":"Represente gastronomia, ingredientes e experiências culinárias com precisão visual.","accent":"from-iconza-lilac/15 to-transparent"},
      {"name":"ICONART","tagline":"Arte e expressão","description":"Mergulhe na estética, composição e linguagem artística aplicada ao design de ícones.","accent":"from-iconza-lavender/20 to-transparent"}
    ]
  }'::jsonb,
  1
)
ON CONFLICT (type) DO NOTHING;
