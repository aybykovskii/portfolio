import type { MiddlewareHandler } from 'astro'

import llmsContent from '../public/llms.txt?raw'

import { bio } from './collections/types'
import { getCommonTranslations, translateEntry } from './i18n'
import { lang as langSchema } from './types'

const SKIP_MARKDOWN = /^(\/_actions|\/api|\/[^/]+\.(js|css|png|jpg|jpeg|svg|ico|webp|xml|txt|json))/

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url
  const accept = context.request.headers.get('accept') ?? ''

  if (!SKIP_MARKDOWN.test(pathname) && accept.includes('text/markdown')) {
    return new Response(llmsContent, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
      },
    })
  }

  const langHeader = langSchema.safeParse(context.request.headers.get('accept-language'))
  const lang = langHeader.success ? langHeader.data : langSchema.parse(context.params.lang ?? 'en')

  context.locals.lang = lang
  context.locals.commonTranslations = getCommonTranslations(lang)
  context.locals.bio = translateEntry(bio, lang)

  const response = await next()

  response.headers.set('Vary', 'Accept')
  response.headers.set(
    'Link',
    '</llms.txt>; rel="describedby", </sitemap-index.xml>; rel="sitemap"',
  )

  return response
}
