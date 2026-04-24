import path from 'node:path'

import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders, passthroughImageService } from 'astro/config'

const site = process.env.SITE_URL

// https://astro.build/config
export default defineConfig({
  site,
  redirects: {
    '/': '/en',
  },
  integrations: [react()],

  output: 'server',

  compressHTML: true,

  image: {
    service: passthroughImageService(),
    domains: ['d18jkaylrcswn0.cloudfront.net'],
  },

  fonts: [{
    name: 'Inter',
    cssVariable: '--font-inter',
    provider: fontProviders.fontsource(),
    fallbacks: ['-apple-system', 'sans-serif'],
    weights: [400, 500, 600, 700],
    subsets: ['cyrillic', 'latin'],
    styles: ['normal'],
    display: 'swap',
  }],

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
