import { z } from 'astro/zod'

import common from '@/collections/common.json'
import type { CommonTranslations } from '@/collections/types'
import { type Lang, lang as langSchema } from '@/types'

const langEntrySchema = z.object({ en: z.string(), ru: z.string(), es: z.string() })

export const buildCommonTranslations = (
  source: Record<string, unknown>,
  lang: Lang,
): Record<string, unknown> =>
  Object.entries(source).reduce<Record<string, unknown>>((acc, [key, value]) => {
    const parsed = langEntrySchema.safeParse(value)

    if (parsed.success) {
      acc[key] = parsed.data[lang]
      return acc
    }

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      acc[key] = buildCommonTranslations(value as Record<string, unknown>, lang)
      return acc
    }

    throw new Error(`i18n: unexpected value at key "${key}": ${JSON.stringify(value)}`)
  }, {} as Record<string, unknown>)

// Pre-computed for all langs at module init — throws at startup if any leaf is missing a lang key
const commonByLang = Object.fromEntries(
  langSchema.options.map((l) => [l, buildCommonTranslations(common, l) as CommonTranslations]),
) as Record<Lang, CommonTranslations>

export const getCommonTranslations = (lang: Lang): CommonTranslations => commonByLang[lang]

export type Translated<T extends { translations: Record<Lang, Record<string, unknown>> }> =
  & Omit<T, 'translations'>
  & T['translations'][Lang]

export const translateEntry = <T extends { translations: Record<Lang, Record<string, unknown>> }>(
  entry: T,
  lang: Lang,
): Translated<T> => {
  const { translations, ...rest } = entry
  return { ...rest, ...translations[lang] } as Translated<T>
}
