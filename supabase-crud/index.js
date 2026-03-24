// @dbasics/pecinhas/supabase-crud
// CRUD generico para Supabase - extraido de 3 projetos dbasics
// Requer: @supabase/supabase-js instalado no projeto

/**
 * Busca todos os registros de uma tabela.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table - Nome da tabela
 * @param {object} [options]
 * @param {string} [options.select='*'] - Colunas para retornar
 * @param {string} [options.orderBy='created_at'] - Coluna para ordenar
 * @param {boolean} [options.ascending=false] - Ordem ascendente
 * @param {Array<{column: string, value: unknown}>} [options.filters] - Filtros eq()
 * @returns {Promise<Array>}
 */
export async function getCollection(supabase, table, options = {}) {
  const { select = '*', orderBy = 'created_at', ascending = false, filters = [] } = options

  let query = supabase.from(table).select(select)
  for (const { column, value } of filters) {
    query = query.eq(column, value)
  }
  query = query.order(orderBy, { ascending })

  const { data, error } = await query
  if (error) throw error
  return data || []
}

/**
 * Busca um registro por ID.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {string} id
 * @param {string} [select='*']
 * @returns {Promise<object|null>}
 */
export async function getDocument(supabase, table, id, select = '*') {
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/**
 * Busca um registro por campo arbitrario.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {string} field - Nome do campo
 * @param {unknown} value - Valor para buscar
 * @param {string} [select='*']
 * @returns {Promise<object|null>}
 */
export async function getDocumentByField(supabase, table, field, value, select = '*') {
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq(field, value)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

/**
 * Cria um registro.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function createDocument(supabase, table, data) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return result
}

/**
 * Cria varios registros de uma vez (batch insert).
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {Array<object>} dataArray
 * @returns {Promise<Array>}
 */
export async function createDocuments(supabase, table, dataArray) {
  const { data, error } = await supabase
    .from(table)
    .insert(dataArray)
    .select()
  if (error) throw error
  return data || []
}

/**
 * Atualiza um registro por ID.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {string} id
 * @param {object} updates
 * @returns {Promise<object>}
 */
export async function updateDocument(supabase, table, id, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Cria ou atualiza (upsert) um registro.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {object} data - Deve incluir a coluna de conflito (geralmente 'id')
 * @returns {Promise<object>}
 */
export async function upsertDocument(supabase, table, data) {
  const { data: result, error } = await supabase
    .from(table)
    .upsert(data)
    .select()
    .single()
  if (error) throw error
  return result
}

/**
 * Deleta um registro por ID.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteDocument(supabase, table, id) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
  if (error) throw error
}

/**
 * Deleta varios registros por IDs (batch delete).
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} table
 * @param {Array<string>} ids
 * @returns {Promise<void>}
 */
export async function deleteDocuments(supabase, table, ids) {
  const { error } = await supabase
    .from(table)
    .delete()
    .in('id', ids)
  if (error) throw error
}
