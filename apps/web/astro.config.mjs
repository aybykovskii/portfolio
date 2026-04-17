import path from 'node:path'

import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

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

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [tailwindcss()],
    server: {
    }
  },

  adapter: node({
    mode: 'standalone',
  }),
})
