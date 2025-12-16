import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const translation = v.string()

export default defineSchema({
  bio: defineTable({
    name: v.string(),
    description: translation,
    avatar: v.string(),
    location: v.string(),
  }),

  experiences: defineTable({
    name: v.string(),
    position: translation,
    start: v.number(),
    end: v.union(v.number(), v.literal('present')),
    company: v.string(),
    companyUrl: v.union(v.string(), v.null()),
    description: translation,
    achievements: translation,
    technologies: v.array(v.id('skills')),
    location: v.string(),
  }),

  projects: defineTable({
    name: v.string(),
    title: v.string(),
    relatedTo: v.union(v.string(), v.literal('pet')),
    description: translation,
    technologies: v.array(v.id('skills')),
    images: v.array(v.string()),
    url: v.union(v.string(), v.null()),
    status: v.union(v.literal('in-progress'), v.literal('completed')),
    button: v.union(v.null(), v.object({
      text: translation,
      url: v.string(),
    })),
  }),

  skills: defineTable({
    name: v.string(),
    level: v.number(),
    icon: v.string(),
    isMain: v.boolean(),
  }),

  languages: defineTable({
    name: v.string(),
    level: v.number(),
    icon: v.string(),
  }),

  socials: defineTable({
    name: v.string(),
    url: v.string(),
    iconPath: v.optional(v.string()),
    iconName: v.optional(v.string()),
    color: v.optional(v.string()),
  }),

  translations: defineTable({
    lang: v.string(),
    key: v.string(),
    text: v.optional(v.string()),
    content: v.optional(v.array(v.string())),
  })
    .index('by_lang', ['lang'])
    .index('by_lang_key', ['lang', 'key']),
})
