import type { SupabaseClient } from '@supabase/supabase-js'

export interface GetCollectionOptions {
  select?: string
  orderBy?: string
  ascending?: boolean
  filters?: Array<{ column: string; value: unknown }>
}

/** Busca todos os registros de uma tabela */
export declare function getCollection(
  supabase: SupabaseClient, table: string, options?: GetCollectionOptions
): Promise<Record<string, unknown>[]>

/** Busca um registro por ID */
export declare function getDocument(
  supabase: SupabaseClient, table: string, id: string, select?: string
): Promise<Record<string, unknown> | null>

/** Busca um registro por campo arbitrario */
export declare function getDocumentByField(
  supabase: SupabaseClient, table: string, field: string, value: unknown, select?: string
): Promise<Record<string, unknown> | null>

/** Cria um registro */
export declare function createDocument(
  supabase: SupabaseClient, table: string, data: Record<string, unknown>
): Promise<Record<string, unknown>>

/** Cria varios registros (batch insert) */
export declare function createDocuments(
  supabase: SupabaseClient, table: string, dataArray: Record<string, unknown>[]
): Promise<Record<string, unknown>[]>

/** Atualiza um registro por ID */
export declare function updateDocument(
  supabase: SupabaseClient, table: string, id: string, updates: Record<string, unknown>
): Promise<Record<string, unknown>>

/** Cria ou atualiza (upsert) */
export declare function upsertDocument(
  supabase: SupabaseClient, table: string, data: Record<string, unknown>
): Promise<Record<string, unknown>>

/** Deleta um registro por ID */
export declare function deleteDocument(
  supabase: SupabaseClient, table: string, id: string
): Promise<void>

/** Deleta varios registros por IDs (batch) */
export declare function deleteDocuments(
  supabase: SupabaseClient, table: string, ids: string[]
): Promise<void>
