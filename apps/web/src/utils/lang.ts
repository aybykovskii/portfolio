import { type Extended, type Lang, lang as langs } from '@/types'

export const isLangSupported = (lang: Extended<Lang>): lang is Lang => langs.safeParse(lang).success
