import { z } from 'astro/zod'

import { lang } from '@/types'

import rawBio from '../bio.json'

const contactSchema = z.object({
  class: z.string(),
  value: z.string(),
})

const bioSchema = z.object({
  avatar: z.string(),
  contacts: z.object({
    email: contactSchema,
    linkedin: contactSchema,
    github: contactSchema,
  }),
  translations: z.record(lang, z.object({
    description: z.string(),
    name: z.string(),
    position: z.string(),
    highlight: z.string(),
    location: z.string(),
  })),
})

export type Bio = z.infer<typeof bioSchema>
export const bio = bioSchema.parse(rawBio)
