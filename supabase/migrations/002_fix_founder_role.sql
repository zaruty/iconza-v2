-- Corrige a divergência encontrada na auditoria:
-- O role "founder" estava protegido no TypeScript mas
-- NÃO estava nas funções SQL nem na constraint da tabela profiles.

-- 1. Corrige a constraint da tabela profiles para incluir founder
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('student', 'analyst', 'editor', 'admin', 'founder'));

-- 2. Recria is_cms_editor() para incluir founder (alinha com o TypeScript)
CREATE OR REPLACE FUNCTION public.is_cms_editor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_panel_role(ARRAY['admin', 'editor', 'founder']);
$$;
