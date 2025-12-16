import { Extended, Lang, lang as langs } from '@/types'

export const isLangSupported = (lang: Extended<Lang>): lang is Lang => langs.safeParse(lang).success
