import { z } from 'zod'

export const lang = z.enum(['ru', 'en', 'es'])
export type Lang = z.infer<typeof lang>
