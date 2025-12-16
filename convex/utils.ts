// convex/translations.ts
import type { Doc } from './_generated/dataModel'
import type { QueryCtx } from './_generated/server'

export type Lang = string

export function getTranslationValue (t: Doc<'translations'>): string {
  return t.text ?? t.content?.join('\n') ?? ''
}

// 1) Грузим все переводы для языка один раз
export async function buildTranslationsMap (
  ctx: QueryCtx,
  lang: Lang,
): Promise<Record<string, string>> {
  const rows = await ctx.db
    .query('translations')
    .withIndex('by_lang', (q) => q.eq('lang', lang))
    .collect()

  const map: Record<string, string> = {}
  for (const row of rows) {
    map[row.key] = getTranslationValue(row)
  }
  return map
}

// convex/translations.ts (продолжение)

/**
 * Рекурсивно проходит по значению и заменяет строки, которые есть в map.
 */
function translateValueDeep (
  value: unknown,
  map: Record<string, string>,
): unknown {
  if (typeof value === 'string') {
    const translated = map[value]
    return translated ?? value
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateValueDeep(item, map))
  }

  if (value && typeof value === 'object') {
    const obj: any = value
    const result: any = Array.isArray(obj) ? [] : {}
    for (const [k, v] of Object.entries(obj)) {
      result[k] = translateValueDeep(v, map)
    }
    return result
  }

  // number, boolean, null, undefined, etc.
  return value
}

/**
 * Принимает один документ или массив документов и
 * возвращает новые объекты с подставленными переводами.
 */
export function translateDocsWithMap<T> (
  docs: T,
  map: Record<string, string>,
): T {
  if (Array.isArray(docs)) {
    return docs.map((doc) => translateValueDeep(doc, map)) as T
  }

  return translateValueDeep(docs, map) as T
}

/**
 * Удобный helper: внутри сам грузит переводы и переводит docs.
 * Удобно для простых getX, где ты работаешь с одной таблицей.
 */
export async function autoTranslateDocs<T> (
  ctx: QueryCtx,
  lang: Lang,
  docs: T,
): Promise<T> {
  const map = await buildTranslationsMap(ctx, lang)

  return translateDocsWithMap(docs, map)
}
