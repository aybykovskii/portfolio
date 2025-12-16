import { v } from 'convex/values'

import { query, QueryCtx } from './_generated/server'
import { autoTranslateDocs, Lang } from './utils'

export const getExperiences = async (
  ctx: QueryCtx,
  lang: Lang,
) => {
  const experiences = await ctx.db.query('experiences').collect()
  const skills = await ctx.db.query('skills').collect()
  const translatedExperiences = await autoTranslateDocs(ctx, lang, experiences)
  const richExperiences = translatedExperiences.map((experience) => ({
    ...experience,
    technologies: skills.filter((skill) => experience.technologies.includes(skill._id)),
  }))

  return richExperiences
}

export type RichExperience = Awaited<ReturnType<typeof getExperiences>>[number]

export const get = query({
  args: { lang: v.string() },
  handler: async (ctx, { lang }) => getExperiences(ctx, lang),
})
