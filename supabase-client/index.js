// @dbasics/pecinhas/supabase-client
// Cria cliente Supabase com noopLock (evita AbortError do Navigator LockManager)
// Requer: @supabase/supabase-js instalado no projeto

import { createClient } from '@supabase/supabase-js'

// Lock no-op: evita AbortError causado pelo Navigator LockManager API
// quando queries de dados chamam getSession() concorrentemente.
// Seguro para apps single-tab.
const noopLock = async (_name, _acquireTimeout, fn) => await fn()

/**
 * Cria cliente Supabase padronizado com noopLock e configs seguras.
 *
 * @param {string} url - URL do projeto Supabase (ex: import.meta.env.VITE_SUPABASE_URL)
 * @param {string} anonKey - Chave anon do projeto (ex: import.meta.env.VITE_SUPABASE_ANON_KEY)
 * @param {object} [options] - Opcoes extras do createClient (mergeia com os defaults)
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function createSupabaseClient(url, anonKey, options = {}) {
  const { auth: authOptions, ...restOptions } = options

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: noopLock,
      ...authOptions,
    },
    ...restOptions,
  })
}
