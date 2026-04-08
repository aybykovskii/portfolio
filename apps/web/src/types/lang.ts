import { z } from 'astro/zod'

export const lang = z.enum(['en', 'ru', 'es'])
export type Lang = z.infer<typeof lang>
