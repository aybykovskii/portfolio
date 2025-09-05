import { ReactNode } from 'react'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProvider } from 'convex/react'

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  console.error('missing env var CONVEX_URL')
}
const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

export const AppConvexProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConvexProvider client={convexQueryClient.convexClient}>
      {children}
    </ConvexProvider>
  )
}
