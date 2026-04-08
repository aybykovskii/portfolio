import { z } from 'astro/zod'

import { lang } from '@/types'

import rawBio from '../bio.json'

const bioSchema = z.object({
  avatar: z.string().optional(),
  contacts: z.object({
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
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

