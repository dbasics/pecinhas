import type { RefObject, MouseEventHandler } from 'react'

interface OverlayProps {
  onClick: MouseEventHandler<HTMLElement>
}

interface UseModalReturn {
  /** Ref para aplicar no elemento do modal (onde fica o conteudo) */
  modalRef: RefObject<HTMLElement | null>
  /** Props para aplicar no overlay (fecha ao clicar fora) */
  overlayProps: OverlayProps
}

/**
 * Hook que gerencia acessibilidade de modal:
 * ESC fecha, focus trap, scroll lock, restaura foco.
 */
export declare function useModal(isOpen: boolean, onClose: () => void): UseModalReturn
