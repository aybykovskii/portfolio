import { api } from '@convex/_generated/api'
import { CONVEX_URL } from 'astro:env/client'
import { ConvexHttpClient } from 'convex/browser'
import { useQuery } from 'convex/react'

import { useLang } from './useLang'

const queryClient = new ConvexHttpClient(CONVEX_URL)
const translations = await queryClient.query(api.translations.get)

export const useT = () => {
  const { lang } = useLang()

  return (key: string) => {
    console.log({ key, lang, translations })
    return translations?.find((t) => t.key === key && t.lang === lang)?.text || 'Translation not found'
  }
}
