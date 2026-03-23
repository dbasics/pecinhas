// @dbasics/pecinhas/toast
// Sistema pub/sub de notificacoes (toasts)
// Framework-agnostico: funciona com React, vanilla JS, qualquer coisa

/** @type {Set<ToastCallback>} */
const listeners = new Set()
let nextId = 1

/**
 * Exibe um toast. Todos os subscribers recebem o evento.
 *
 * @param {string} message - Texto do toast
 * @param {'success' | 'error' | 'warning' | 'info'} [type='success']
 * @returns {number} ID do toast (para dismiss manual)
 */
export function showToast(message, type = 'success') {
  const event = { id: nextId++, message, type }
  listeners.forEach(cb => cb(event))
  return event.id
}

/**
 * Dismiss manual de um toast pelo ID.
 *
 * @param {number} id
 */
export function dismissToast(id) {
  listeners.forEach(cb => cb({ id, message: '', type: 'dismiss', dismiss: true }))
}

/**
 * Registra um callback para receber eventos de toast.
 * Retorna funcao para cancelar a inscricao.
 *
 * @param {(event: ToastEvent) => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeToast(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}
