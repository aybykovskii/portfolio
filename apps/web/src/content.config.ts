import { file } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

import { lang } from './types'

const base = 'src/collections'

const technologies = defineCollection({
  loader: file(`${base}/technologies.json`),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    isMain: z.boolean().optional(),
  }),
})

const experienceTranslationSchema = z.object({
  description: z.string(),
  achievements: z.array(z.string()),
})

const experiences = defineCollection({
  loader: file(`${base}/experiences.json`),
  schema: z.object({
    id: z.number(),
    slug: z.string(),
    company: z.string(),
    companyUrl: z.union([z.string(), z.null()]),
    start: z.number(),
    end: z.union([z.number(), z.literal('present')]),
    location: z.string(),
    position: z.string(),
    technologies: z.array(reference('technologies')),
    translations: z.record(lang, experienceTranslationSchema),
  }),
})

const translationSchema = z.object({
  description: z.string(),
})

const projects = defineCollection({
  loader: file(`${base}/projects.json`),
  schema: z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    images: z.array(z.string()),
    status: z.enum(['in-progress', 'completed']),
    technologies: z.array(z.string()),
    button: z.object({
      text: z.string(),
      icon: z.string(),
      url: z.string(),
    }).nullable(),
    url: z.string().optional(),
    translations: z.record(lang, translationSchema),
  }),
})

const languageTranslationSchema = z.object({
  name: z.string(),
})

const languages = defineCollection({
  loader: file(`${base}/languages.json`),
  schema: z.object({
    id: z.string(),
    level: z.number().min(1).max(5),
    translations: z.record(lang, languageTranslationSchema),
  }),
})

export const collections = { projects, technologies, experiences, languages }
