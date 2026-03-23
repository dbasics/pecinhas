import type { SupabaseClient, User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  [key: string]: unknown
}

export interface UseAuthOptions {
  /** Busca dados extras (ex: role) apos login. Retorna objeto mergeado ao user. */
  fetchUserData?: (user: User) => Promise<Record<string, unknown>>
  /** Callback apos login completo */
  onSignIn?: (user: AuthUser) => void
  /** Callback apos logout */
  onSignOut?: () => void
}

export interface UseAuthReturn {
  /** Dados do usuario logado (null se deslogado) */
  user: AuthUser | null
  /** true enquanto verifica sessao inicial */
  loading: boolean
  /** true/false/null (null = ainda verificando) */
  authenticated: boolean | null
  /** Login com email e senha. Retorna { error? } */
  login: (email: string, password: string) => Promise<{ error?: string }>
  /** Logout */
  logout: () => Promise<void>
  /** Envia email de reset de senha. Retorna { error? } */
  resetPassword: (email: string) => Promise<{ error?: string }>
}

/**
 * Hook de autenticacao Supabase com suporte a dados extras (roles, etc.)
 */
export declare function useAuth(
  supabase: SupabaseClient,
  options?: UseAuthOptions
): UseAuthReturn
