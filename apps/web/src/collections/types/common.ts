import type { Prettify } from '@/types'

import common from '../common.json'

type ResolveTranslations<T> = {
  [K in keyof T]: T[K] extends Record<string, string> ? string : ResolveTranslations<T[K]>
}

export type CommonSource = typeof common
export type CommonTranslations = Prettify<ResolveTranslations<CommonSource>>
