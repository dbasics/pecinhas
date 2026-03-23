/** Formata valor em reais: 1234.56 → "R$ 1.234,56" */
export declare function formatCurrency(value: number): string

/** Formata numero com separador de milhar: 1234.5 → "1.234,5" */
export declare function formatNumber(value: number): string

/** Formata percentual: 12.345 → "12.3%" */
export declare function formatPercent(value: number, decimals?: number): string

/** Formata data completa: "2026-01-15" → "15/01/2026" */
export declare function formatDate(dateStr: string): string

/** Formata data curta: "2026-01-15" → "15/01" */
export declare function formatDateShort(dateStr: string): string

/** Converte string BR para numero: "1.234,56" → 1234.56 */
export declare function parseValor(str: string | number): number

/** parseValor seguro: retorna null em vez de NaN */
export declare function safeParseValor(str: string | number): number | null

/** Data atual no formato ISO: "2026-01-15" */
export declare function todayISO(): string

/** Mes e ano atuais */
export declare function currentMonth(): { mes: number; ano: number }

/** Normaliza string: remove acentos, lowercase, trim */
export declare function normalizeStr(str: string): string
