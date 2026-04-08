import { z } from 'astro/zod'

export const themes = z.enum(['dracula', 'lofi'])
export type Theme = z.infer<typeof themes>
