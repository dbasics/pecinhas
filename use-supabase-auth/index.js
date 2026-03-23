// @dbasics/pecinhas/use-supabase-auth
// Hook React para autenticacao Supabase
// Padrao extraido de 5 projetos dbasics
// Requer: react + @supabase/supabase-js instalados no projeto

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook de autenticacao Supabase.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase - Cliente Supabase
 * @param {object} [options]
 * @param {(user: object) => Promise<object>} [options.fetchUserData] - Busca dados extras (ex: role) apos login. Recebe o user do Supabase, retorna objeto que sera mergeado.
 * @param {(user: object) => void} [options.onSignIn] - Callback apos login completo
 * @param {() => void} [options.onSignOut] - Callback apos logout
 * @returns {{ user: object|null, loading: boolean, authenticated: boolean|null, login: Function, logout: Function, resetPassword: Function }}
 *
 * @example
 * // Simples (sem roles)
 * const { user, loading, login, logout } = useAuth(supabase)
 *
 * @example
 * // Com busca de role
 * const { user, login, logout } = useAuth(supabase, {
 *   fetchUserData: async (user) => {
 *     const { data } = await supabase.from('usuarios').select('role').eq('id', user.id).single()
 *     return { role: data?.role || 'viewer' }
 *   }
 * })
 */
export function useAuth(supabase, options = {}) {
  const { onSignIn, onSignOut, fetchUserData } = options
  const [state, setState] = useState({ user: null, loading: true })
  const initializedRef = useRef(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') &&
          session?.user
        ) {
          if (!initializedRef.current) {
            initializedRef.current = true
            // setTimeout(0) para sair do contexto de _notifyAllSubscribers
            // e evitar deadlock no Supabase auth
            setTimeout(async () => {
              let userData = {
                id: session.user.id,
                email: session.user.email,
              }
              if (fetchUserData) {
                try {
                  const extra = await fetchUserData(session.user)
                  userData = { ...userData, ...extra }
                } catch (err) {
                  console.warn('[useAuth] fetchUserData falhou:', err)
                }
              }
              setState({ user: userData, loading: false })
              onSignIn?.(userData)
            }, 0)
          }
        } else if (event === 'SIGNED_OUT') {
          initializedRef.current = false
          setState({ user: null, loading: false })
          onSignOut?.()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const login = useCallback(
    async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        if (error.message.includes('Invalid login')) {
          return { error: 'Email ou senha incorretos.' }
        }
        return { error: error.message }
      }
      return {}
    },
    [supabase]
  )

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
  }, [supabase])

  const resetPassword = useCallback(
    async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) return { error: error.message }
      return {}
    },
    [supabase]
  )

  return {
    user: state.user,
    loading: state.loading,
    authenticated: state.loading ? null : !!state.user,
    login,
    logout,
    resetPassword,
  }
}
