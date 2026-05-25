export type Profile = {
  id: string;
  email: string | null;
  nome_completo: string | null;
  telefone: string | null;
  pais: string | null;
  cidade: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};
