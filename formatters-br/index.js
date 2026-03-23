// @dbasics/pecinhas/formatters-br
// Formatadores e parsers para o padrão brasileiro (pt-BR)

/**
 * Formata valor em reais: 1234.56 → "R$ 1.234,56"
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  const num = Number(value) || 0
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/**
 * Formata numero com separador de milhar: 1234.5 → "1.234,5"
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return Number(value).toLocaleString('pt-BR')
}

/**
 * Formata percentual: 12.345 → "12.3%"
 * @param {number} value
 * @param {number} [decimals=1]
 * @returns {string}
 */
export function formatPercent(value, decimals = 1) {
  return Number(value).toFixed(decimals) + '%'
}

/**
 * Formata data completa: "2026-01-15" → "15/01/2026"
 * Usa T12:00:00 para evitar problemas de fuso horario (DST)
 * @param {string} dateStr - formato YYYY-MM-DD
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('pt-BR')
}

/**
 * Formata data curta: "2026-01-15" → "15/01"
 * @param {string} dateStr - formato YYYY-MM-DD
 * @returns {string}
 */
export function formatDateShort(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  if (isNaN(d.getTime())) return dateStr
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
}

/**
 * Converte string BR para numero: "1.234,56" → 1234.56
 * Retorna NaN para input invalido
 * @param {string|number} str
 * @returns {number}
 */
export function parseValor(str) {
  if (typeof str === 'number') return str
  if (!str) return NaN
  return parseFloat(String(str).replace(/\./g, '').replace(',', '.'))
}

/**
 * parseValor seguro: retorna null em vez de NaN para input invalido
 * @param {string|number} str
 * @returns {number|null}
 */
export function safeParseValor(str) {
  const val = parseValor(str)
  return isNaN(val) ? null : val
}

/**
 * Data atual no formato ISO: "2026-01-15"
 * @returns {string}
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0]
}

/**
 * Mes e ano atuais
 * @returns {{ mes: number, ano: number }}
 */
export function currentMonth() {
  const now = new Date()
  return { mes: now.getMonth() + 1, ano: now.getFullYear() }
}

/**
 * Normaliza string para comparacao: remove acentos, lowercase, trim
 * "São Paulo" → "sao paulo"
 * @param {string} str
 * @returns {string}
 */
export function normalizeStr(str) {
  if (!str) return ''
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
