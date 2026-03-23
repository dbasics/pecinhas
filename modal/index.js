// @dbasics/pecinhas/modal
// Hook React para modal com acessibilidade completa:
// - ESC fecha o modal
// - Focus trap (Tab/Shift+Tab cicla dentro do modal)
// - Scroll lock (body nao rola enquanto modal aberto)
// - Restaura foco ao elemento anterior ao fechar
// - Fecha ao clicar no overlay
// Requer: react instalado no projeto

import { useEffect, useRef, useCallback } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not(:disabled)',
  'textarea:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Hook que gerencia acessibilidade de modal.
 * Retorna refs e props para aplicar no seu componente visual.
 *
 * @param {boolean} isOpen - Se o modal esta aberto
 * @param {() => void} onClose - Callback para fechar o modal
 * @returns {{ modalRef: React.RefObject, overlayProps: { onClick: Function } }}
 *
 * @example
 * const { modalRef, overlayProps } = useModal(isOpen, onClose)
 * return isOpen ? (
 *   <div className="overlay" {...overlayProps}>
 *     <div className="modal" ref={modalRef}>
 *       {children}
 *     </div>
 *   </div>
 * ) : null
 */
export function useModal(isOpen, onClose) {
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  // ESC fecha o modal
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  // Focus trap + restaurar foco
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement
    const modal = modalRef.current
    if (!modal) return

    const focusables = modal.querySelectorAll(FOCUSABLE)
    if (focusables.length) focusables[0].focus()

    const trapFocus = (e) => {
      if (e.key !== 'Tab' || !focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)

    return () => {
      document.removeEventListener('keydown', trapFocus)
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen])

  // Fecha ao clicar no overlay (fora do modal)
  const overlayProps = {
    onClick: useCallback((e) => {
      if (e.target === e.currentTarget) onClose()
    }, [onClose]),
  }

  return { modalRef, overlayProps }
}
