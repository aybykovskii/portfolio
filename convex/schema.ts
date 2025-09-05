import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  info: defineTable({
    name: v.string(),
    position: v.string(),
    start: v.number(),
    end: v.union(v.number(), v.literal('present')),
    company: v.string(),
  }),

  experiences: defineTable({
    name: v.string(),
    position: v.string(),
    start: v.number(),
    end: v.union(v.number(), v.literal('present')),
    company: v.string(),
    companyUrl: v.union(v.string(), v.null()),
    description: v.string(),
    advantages: v.array(v.string()),
    technologies: v.array(v.string()),
    images: v.array(v.string()),
  }),

  projects: defineTable({
    name: v.string(),
    title: v.string(),
    relatedTo: v.union(v.string(), v.literal('pet')),
    description: v.string(),
    technologies: v.array(v.string()),
    images: v.array(v.string()),
    url: v.union(v.string(), v.null()),
    status: v.union(v.literal('in-progress'), v.literal('completed')),
    button: v.union(v.null(), v.object({
      text: v.string(),
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

  educations: defineTable({
    name: v.string(),
    start: v.number(),
    end: v.number(),
    description: v.string(),
  }),

  contacts: defineTable({
    name: v.string(),
    url: v.string(),
    icon: v.string(),
  }),

  socials: defineTable({
    name: v.string(),
    url: v.string(),
    icon: v.string(),
  }),

  translations: defineTable({
    lang: v.string(),
    key: v.string(),
    text: v.string(),
  }),
})
