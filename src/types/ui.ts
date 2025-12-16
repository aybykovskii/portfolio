import { z } from 'zod/v4-mini'

export const theme = z.enum(['light', 'dark'])
export type Theme = z.infer<typeof theme>
