# Supabase — CMS ICONZA v2

## Aplicar migration

1. Abra o **SQL Editor** no dashboard Supabase.
2. Execute o conteúdo de `supabase/migrations/001_cms_foundation.sql`.
3. Promova sua conta admin:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu@email.com';
```

## Roles

| Role | Permissões |
|------|------------|
| `student` | App da aluna (padrão) |
| `admin` | Painel + CMS + temas + settings |
| `editor` | Painel + CMS (home + mídia) |
| `analyst` | Painel (somente leitura via RLS) |

## Storage

Bucket `media-library` criado pela migration (leitura pública, escrita admin/editor).

## Cron de temas sazonais

Configurado na Parte 3 — chama `public.sync_scheduled_themes()`.
