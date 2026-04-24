import type { MiddlewareHandler } from 'astro'

import llmsContent from '../public/llms.txt?raw'

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

  const lang = (context.params.lang ?? 'en') as Lang

  context.locals.lang = lang
  context.locals.commonTranslations = buildTranslations(common, lang)
  context.locals.bio = getTranslated(bio, lang)

  const response = await next()

  response.headers.set('Vary', 'Accept')
  response.headers.set(
    'Link',
    '</llms.txt>; rel="describedby", </sitemap-index.xml>; rel="sitemap"',
  )

  return response
}
