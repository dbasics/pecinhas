// @dbasics/pecinhas/use-app-state
// Factory para criar store global com Context + useReducer
// Padrao extraido de meta-ads-gestao e controle-estudio-cedtec
// Requer: react instalado no projeto

import { createContext, createElement, useContext, useReducer, useCallback } from 'react'

/**
 * Cria um store global com Context + useReducer.
 * Retorna Provider e hooks prontos para usar.
 *
 * @param {object} initialState - Estado inicial do app
 * @returns {{ AppProvider: Function, useAppState: Function, useAppDispatch: Function, useSetState: Function, useBulkSetState: Function }}
 *
 * @example
 * // store.js
 * const { AppProvider, useAppState, useSetState, useBulkSetState } = createAppStore({
 *   loading: false,
 *   currentUser: null,
 *   items: [],
 * })
 * export { AppProvider, useAppState, useSetState, useBulkSetState }
 *
 * @example
 * // App.jsx - envolve o app com o Provider
 * <AppProvider> <MyApp /> </AppProvider>
 *
 * @example
 * // Component.jsx - usa os hooks
 * const state = useAppState()
 * const set = useSetState()
 * const bulkSet = useBulkSetState()
 * set('loading', true)
 * bulkSet({ items: [...], loading: false })
 */
export function createAppStore(initialState) {
  const StateContext = createContext(null)
  const DispatchContext = createContext(null)

  function reducer(state, action) {
    switch (action.type) {
      case 'SET':
        return { ...state, [action.key]: action.value }
      case 'BULK_SET':
        return { ...state, ...action.updates }
      default:
        return state
    }
  }

  function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return createElement(
      StateContext.Provider,
      { value: state },
      createElement(DispatchContext.Provider, { value: dispatch }, children)
    )
  }

  function useAppState() {
    const state = useContext(StateContext)
    if (state === null) throw new Error('useAppState deve ser usado dentro de <AppProvider>')
    return state
  }

  function useAppDispatch() {
    const dispatch = useContext(DispatchContext)
    if (dispatch === null) throw new Error('useAppDispatch deve ser usado dentro de <AppProvider>')
    return dispatch
  }

  function useSetState() {
    const dispatch = useAppDispatch()
    return useCallback((key, value) => {
      dispatch({ type: 'SET', key, value })
    }, [dispatch])
  }

  function useBulkSetState() {
    const dispatch = useAppDispatch()
    return useCallback((updates) => {
      dispatch({ type: 'BULK_SET', updates })
    }, [dispatch])
  }

  return {
    AppProvider,
    useAppState,
    useAppDispatch,
    useSetState,
    useBulkSetState,
  }
}
