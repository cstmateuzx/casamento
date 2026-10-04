import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://exemplo.supabase.co' &&
  !supabaseUrl.includes('exemplo')
);

// Cliente público do Supabase para uso no frontend (insere confirmações com a anon key)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Cliente com privilégio administrativo (usado apenas em rotas de API no servidor para leitura segura)
export function getAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const keyToUse = (serviceRoleKey && !serviceRoleKey.includes('exemplo'))
    ? serviceRoleKey
    : supabaseAnonKey;

  return createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    keyToUse || 'placeholder-key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export interface ConfirmacaoRecord {
  id?: number;
  convite: string;
  nome: string;
  acompanhantes: string;
  presenca: boolean;
  created_at?: string;
}
