import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Lang } from '@/types'
import { isLangSupported, localState } from '@/utils'

type LangStore = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const getPreferredLang = (): Lang => {
  const systemLang = navigator.language.slice(0, 2).toLowerCase()

  if (isLangSupported(systemLang)) {
    return systemLang
  }

  return 'en'
}

export const useLang = create<LangStore>()(persist((set) => ({
  lang: getPreferredLang(),
  setLang: (lang: Lang) => {
    localState.set('lang', lang)
    set({ lang })
  },
}), {
  name: 'lang',
  storage: createJSONStorage(() => sessionStorage),
}))
