import { describe, expect, it } from 'vitest'

import { buildCommonTranslations, translateEntry } from './index'

const source = {
  actions: {
    contactMe: { en: 'Contact me', ru: 'Связаться', es: 'Contáctame' },
    back: { en: 'Back', ru: 'Назад', es: 'Volver' },
  },
  sections: {
    experience: { en: 'Experience', ru: 'Опыт', es: 'Experiencia' },
  },
}

describe('buildCommonTranslations', () => {
  it('resolves leaf values for the given lang', () => {
    const t = buildCommonTranslations(source, 'en')
    expect(t).toMatchObject({ actions: { contactMe: 'Contact me', back: 'Back' } })
  })

  it('resolves nested keys', () => {
    const t = buildCommonTranslations(source, 'ru')
    expect(t).toMatchObject({ sections: { experience: 'Опыт' } })
  })

  it('picks the right lang across all supported langs', () => {
    expect(buildCommonTranslations(source, 'en')).toMatchObject({ actions: { contactMe: 'Contact me' } })
    expect(buildCommonTranslations(source, 'ru')).toMatchObject({ actions: { contactMe: 'Связаться' } })
    expect(buildCommonTranslations(source, 'es')).toMatchObject({ actions: { contactMe: 'Contáctame' } })
  })

  it('throws when a leaf is missing a lang key', () => {
    const invalid = { label: { en: 'Hello', ru: 'Привет' } } // missing es
    expect(() => buildCommonTranslations(invalid, 'es')).toThrow('i18n')
  })
})

const entry = {
  id: 1,
  slug: 'test',
  translations: {
    en: { title: 'Hello', subtitle: 'World' },
    ru: { title: 'Привет', subtitle: 'Мир' },
    es: { title: 'Hola', subtitle: 'Mundo' },
  },
}

describe('translateEntry', () => {
  it('merges the correct language fields into the entry', () => {
    const result = translateEntry(entry, 'en')
    expect(result.title).toBe('Hello')
    expect(result.subtitle).toBe('World')
  })

  it('picks the right lang', () => {
    expect(translateEntry(entry, 'ru').title).toBe('Привет')
    expect(translateEntry(entry, 'es').title).toBe('Hola')
  })

  it('preserves non-translation fields', () => {
    const result = translateEntry(entry, 'en')
    expect(result.id).toBe(1)
    expect(result.slug).toBe('test')
  })

  it('removes the translations field', () => {
    const result = translateEntry(entry, 'en')
    expect('translations' in result).toBe(false)
  })

  it('handles array values in translations', () => {
    const entryWithArray = {
      slug: 'job',
      translations: {
        en: { description: 'Desc', achievements: ['a', 'b'] },
        ru: { description: 'Описание', achievements: ['в', 'г'] },
        es: { description: 'Desc ES', achievements: ['x', 'y'] },
      },
    }
    const result = translateEntry(entryWithArray, 'ru')
    expect(result.description).toBe('Описание')
    expect(result.achievements).toEqual(['в', 'г'])
  })
})
