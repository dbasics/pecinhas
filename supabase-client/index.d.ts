import type { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js'

/**
 * Cria cliente Supabase padronizado com noopLock e configs seguras.
 * Evita AbortError do Navigator LockManager em apps single-tab.
 */
export declare function createSupabaseClient(
  url: string,
  anonKey: string,
  options?: SupabaseClientOptions<'public'>
): SupabaseClient
