import { v } from 'convex/values'

import { Doc, Id } from './_generated/dataModel'
import { query, QueryCtx } from './_generated/server'
import { autoTranslateDocs, Lang } from './utils'

export const getBio = async (
  ctx: QueryCtx,
  lang: Lang,
) => {
  const bio = await ctx.db.query('bio').first() as Doc<'bio'>
  const translatedBio = await autoTranslateDocs(ctx, lang, bio)

  const url = await ctx.storage.getUrl(bio.avatar as Id<'_storage'>) as string

  return {
    ...translatedBio,
    avatar: url,
  }
}

export const get = query({
  args: { lang: v.string() },
  handler: async (ctx, { lang }) => getBio(ctx, lang),
})
