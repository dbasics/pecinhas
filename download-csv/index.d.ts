export interface DownloadCSVOptions {
  /** Separador de colunas (padrao ';' para Excel BR) */
  separator?: string
  /** Colunas especificas para exportar (padrao: todas do primeiro item) */
  columns?: string[]
  /** Mapeamento coluna → nome de exibicao no header */
  headers?: Record<string, string>
}

/** Gera e faz download de CSV compativel com Excel BR (BOM UTF-8 + ;) */
export declare function downloadCSV(
  data: Record<string, unknown>[],
  filename: string,
  options?: DownloadCSVOptions
): void
