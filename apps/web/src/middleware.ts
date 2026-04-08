import type { MiddlewareHandler } from "astro"

import common from "./collections/common.json"
import type { CommonKey } from "./collections/types"
import type { Lang } from "./types"

export const onRequest: MiddlewareHandler = async (context, next) => {
  const lang = context.params.lang as Lang

  const commonTranslations = Object.entries(common).reduce((acc, [key, value]) => {
    acc[key] = value[lang ?? 'en']
    return acc
  }, {} as Record<CommonKey, string>)

  context.locals.commonTranslations = commonTranslations

  return next()
}