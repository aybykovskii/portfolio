import { type Extended, type Lang, lang as langs } from '@/types'

export const isLangSupported = (lang: Extended<Lang>): lang is Lang => langs.safeParse(lang).success

export const getTranslatedKey = (key: string, common: Record<string, string>) =>
  common[key] ?? 'Could not find translation'

export const getTranslated = <
  Entry extends { translations: Record<Lang, Record<string, string>> }
>(entry: Entry, lang: Lang): Omit<Entry, 'translations'> & Entry['translations'][Lang] => {
  return {
    ...entry,
    ...entry.translations[lang],
  } as Omit<Entry, 'translations'> & Entry['translations'][Lang]
}