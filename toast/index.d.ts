export interface ToastEvent {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info' | 'dismiss'
  dismiss?: boolean
}

export type ToastCallback = (event: ToastEvent) => void

/** Exibe um toast. Retorna o ID para dismiss manual. */
export declare function showToast(
  message: string,
  type?: 'success' | 'error' | 'warning' | 'info'
): number

/** Dismiss manual de um toast pelo ID. */
export declare function dismissToast(id: number): void

/** Registra callback para eventos de toast. Retorna unsubscribe. */
export declare function subscribeToast(callback: ToastCallback): () => void
