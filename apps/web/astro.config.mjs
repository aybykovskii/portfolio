import path from 'node:path'

import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': '/en',
  },
  integrations: [react()],

  output: 'server',

  compressHTML: true,

  image: {
    domains: ['d18jkaylrcswn0.cloudfront.net', 'cdn.simpleicons.org'],
  },

  trailingSlash: 'ignore',

  env: {
    schema: {
      PROJECT_DETAILS_ENABLED: envField.boolean({
        default: false,
        context: 'server',
        access: 'public',
        optional: true,
      }),
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'es'],
    routing: {
      redirectToDefaultLocale: true,
      prefixDefaultLocale: true,
    },
  },

  server: {
    port: 4333,
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  adapter: node({
    mode: 'standalone',
  }),
})
