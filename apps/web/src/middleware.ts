import type { MiddlewareHandler } from 'astro'

import bio from './collections/bio.json'
import common from './collections/common.json'
import type { CommonTranslations } from './collections/types'
import type { Lang } from './types'
import { getTranslated } from './utils'

function assertIsTranslations (obj: unknown): obj is Record<Lang, string> {
  return typeof obj === 'object' && obj !== null && 'en' in obj && typeof obj.en === 'string'
}

function buildTranslations (obj: Record<string, unknown>, lang: Lang): CommonTranslations {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      assertIsTranslations(value)
        ? [key, value[lang] ?? value.en]
        : [key, buildTranslations(value as Record<string, unknown>, lang)]
    ),
  ) as CommonTranslations
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const lang = (context.params.lang ?? 'en') as Lang

  context.locals.lang = lang
  context.locals.commonTranslations = buildTranslations(common, lang)
  context.locals.bio = getTranslated(bio, lang)

  return next()
}
