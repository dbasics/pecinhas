// @dbasics/pecinhas/whatsapp-float
// Utilitarios para botao flutuante de WhatsApp
// buildWhatsAppUrl: sem dependencias
// useWhatsAppFloat: requer react

import { useState, useEffect } from 'react'

/**
 * Monta a URL do WhatsApp (wa.me) com numero e mensagem opcional.
 *
 * @param {string} phone - Numero com DDI, sem espacos/tracos (ex: '5527999999999')
 * @param {string} [message] - Mensagem pre-preenchida
 * @returns {string}
 *
 * @example
 * buildWhatsAppUrl('5527999999999')
 * // → 'https://wa.me/5527999999999'
 *
 * buildWhatsAppUrl('5527999999999', 'Oi, quero saber mais!')
 * // → 'https://wa.me/5527999999999?text=Oi%2C%20quero%20saber%20mais!'
 */
export function buildWhatsAppUrl(phone, message) {
  const clean = phone.replace(/\D/g, '')
  const base = `https://wa.me/${clean}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Hook React que controla visibilidade do botao de WhatsApp.
 * Pode aparecer apos scroll, apos delay, ou sempre visivel.
 *
 * @param {object} [options]
 * @param {string} options.phone - Numero do WhatsApp (obrigatorio)
 * @param {string} [options.message] - Mensagem pre-preenchida
 * @param {boolean} [options.alwaysVisible=false] - Sempre visivel (ignora scroll/delay)
 * @param {number} [options.scrollPercent=30] - Percentual de scroll para aparecer (0-100)
 * @param {number} [options.delayMs=3000] - Delay em ms para aparecer (0 = sem delay)
 * @returns {{ visible: boolean, url: string }}
 *
 * @example
 * // Aparece apos 30% scroll OU 3 segundos
 * const { visible, url } = useWhatsAppFloat({ phone: '5527999999999' })
 *
 * @example
 * // Sempre visivel
 * const { visible, url } = useWhatsAppFloat({ phone: '5527999999999', alwaysVisible: true })
 */
export function useWhatsAppFloat(options = {}) {
  const { phone, message, alwaysVisible = false, scrollPercent = 30, delayMs = 3000 } = options
  const [visible, setVisible] = useState(alwaysVisible)
  const url = buildWhatsAppUrl(phone || '', message)

  useEffect(() => {
    if (alwaysVisible) {
      setVisible(true)
      return
    }

    let shown = false
    const show = () => {
      if (!shown) {
        shown = true
        setVisible(true)
      }
    }

    // Timer
    const timer = delayMs > 0 ? setTimeout(show, delayMs) : null

    // Scroll
    const handleScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && (scrolled / docHeight) * 100 >= scrollPercent) {
        show()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [alwaysVisible, scrollPercent, delayMs])

  return { visible, url }
}
