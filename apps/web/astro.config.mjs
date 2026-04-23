import path from 'node:path'

import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'

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
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      RESEND_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'public',
      }),
      RESEND_TO_EMAIL: envField.string({
        context: 'server',
        access: 'public',
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
