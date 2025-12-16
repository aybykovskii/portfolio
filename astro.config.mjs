import react from '@astrojs/react'
import node from '@astrojs/node'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': '/en',
  },
  integrations: [react()],

  output: 'server',

  compressHTML: true,

  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'es'],
    routing: {
      redirectToDefaultLocale: true,
      prefixDefaultLocale: true,
    },
  },

  env: {
    schema: {
      CONVEX_URL: envField.string({
        access: 'public',
        context: 'client',
        optional: true,
        default: '',
      }),
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
})
