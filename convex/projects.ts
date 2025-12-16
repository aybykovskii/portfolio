import { v } from 'convex/values'

import { query, QueryCtx } from './_generated/server'
import { autoTranslateDocs, Lang } from './utils'

export const getProjects = async (
  ctx: QueryCtx,
  lang: Lang,
  name?: string,
) => {
  const projects =
    await (name ? ctx.db.query('projects').filter((q) => q.eq(q.field('name'), name)) : ctx.db.query('projects'))
      .collect()
  const skills = await ctx.db.query('skills').collect()
  const translated = await autoTranslateDocs(ctx, lang, projects)
  const rich = translated.map((project) => ({
    ...project,
    technologies: skills.filter((skill) => project.technologies.includes(skill._id)),
  }))

  return rich
}

export type RichProject = Awaited<ReturnType<typeof getProjects>>[number]

export const get = query({
  args: { lang: v.string() },
  handler: async (ctx, { lang }) => getProjects(ctx, lang),
})

export const getByName = query({
  args: {
    name: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    const [project] = await getProjects(ctx, args.lang, args.name)
    return project
  },
})
