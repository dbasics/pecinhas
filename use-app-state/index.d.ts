import type { ReactNode, Dispatch } from 'react'

export type SetAction = { type: 'SET'; key: string; value: unknown }
export type BulkSetAction = { type: 'BULK_SET'; updates: Record<string, unknown> }
export type AppAction = SetAction | BulkSetAction

export interface AppStoreResult<T extends Record<string, unknown>> {
  /** Provider React - envolve o app */
  AppProvider: (props: { children: ReactNode }) => ReactNode
  /** Retorna o estado completo */
  useAppState: () => T
  /** Retorna o dispatch (para acoes customizadas) */
  useAppDispatch: () => Dispatch<AppAction>
  /** Retorna funcao set(key, value) para atualizar uma chave */
  useSetState: () => <K extends keyof T>(key: K, value: T[K]) => void
  /** Retorna funcao bulkSet(updates) para atualizar varias chaves */
  useBulkSetState: () => (updates: Partial<T>) => void
}

/** Cria store global com Context + useReducer. */
export declare function createAppStore<T extends Record<string, unknown>>(
  initialState: T
): AppStoreResult<T>
