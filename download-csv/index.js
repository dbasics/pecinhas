// @dbasics/pecinhas/download-csv
// Exporta array de objetos para CSV compativel com Excel BR
// Sem dependencias

/**
 * Gera e faz download de um arquivo CSV.
 * Compativel com Excel (BOM UTF-8 + separador ponto-e-virgula).
 *
 * @param {Array<Record<string, unknown>>} data - Array de objetos
 * @param {string} filename - Nome do arquivo (sem extensao)
 * @param {object} [options]
 * @param {string} [options.separator=';'] - Separador de colunas (padrao ';' para Excel BR)
 * @param {string[]} [options.columns] - Colunas especificas para exportar (padrao: todas do primeiro item)
 * @param {Record<string, string>} [options.headers] - Mapeamento coluna → nome de exibicao no header
 *
 * @example
 * downloadCSV(usuarios, 'usuarios-export')
 *
 * @example
 * downloadCSV(dados, 'relatorio', {
 *   columns: ['nome', 'email', 'valor'],
 *   headers: { nome: 'Nome Completo', email: 'E-mail', valor: 'Valor (R$)' },
 * })
 */
export function downloadCSV(data, filename, options = {}) {
  if (!data || data.length === 0) return

  const { separator = ';', columns, headers = {} } = options
  const cols = columns || Object.keys(data[0])

  const headerRow = cols.map(col => headers[col] || col).join(separator)

  const rows = data.map(item =>
    cols.map(col => {
      const val = item[col]
      if (val === null || val === undefined) return ''
      const str = String(val)
      // Escapa aspas duplas e envolve se tiver separador, aspas ou quebra de linha
      if (str.includes(separator) || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"'
      }
      return str
    }).join(separator)
  )

  // BOM UTF-8 para Excel reconhecer acentos corretamente
  const bom = '\uFEFF'
  const csv = bom + headerRow + '\n' + rows.join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.csv') ? filename : filename + '.csv'
  link.click()
  URL.revokeObjectURL(url)
}
