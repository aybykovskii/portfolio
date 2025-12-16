import { CONVEX_URL } from 'astro:env/client'
import { ConvexClient, ConvexHttpClient } from 'convex/browser'

export const convexClient = new ConvexClient(CONVEX_URL)
export const convexHttpClient = new ConvexHttpClient(CONVEX_URL)
