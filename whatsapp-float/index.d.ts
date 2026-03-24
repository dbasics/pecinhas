/** Monta URL do WhatsApp (wa.me) com numero e mensagem opcional */
export declare function buildWhatsAppUrl(phone: string, message?: string): string

export interface UseWhatsAppFloatOptions {
  /** Numero do WhatsApp com DDI (ex: '5527999999999') */
  phone: string
  /** Mensagem pre-preenchida */
  message?: string
  /** Sempre visivel, ignora scroll/delay (default: false) */
  alwaysVisible?: boolean
  /** Percentual de scroll para aparecer, 0-100 (default: 30) */
  scrollPercent?: number
  /** Delay em ms para aparecer (default: 3000) */
  delayMs?: number
}

export interface UseWhatsAppFloatReturn {
  /** Se o botao deve estar visivel */
  visible: boolean
  /** URL pronta do WhatsApp */
  url: string
}

/** Hook que controla visibilidade do botao de WhatsApp */
export declare function useWhatsAppFloat(options?: UseWhatsAppFloatOptions): UseWhatsAppFloatReturn
