import { v } from 'convex/values'

import { query } from './_generated/server'
import { getBio } from './bio'
import { getExperiences } from './experiences'
import { getProjects } from './projects'

export const get = query({
  args: {
    lang: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const lang = args.lang ?? 'en'

    const [bio, experiences, projects, skills, languages, socials] = await Promise.all([
      getBio(ctx, lang),
      getExperiences(ctx, lang),
      getProjects(ctx, lang),
      ctx.db.query('skills').collect(),
      ctx.db.query('languages').collect(),
      ctx.db.query('socials').collect(),
    ])

    return {
      bio,
      experiences,
      projects,
      skills,
      languages,
      socials,
    }
  },
})
