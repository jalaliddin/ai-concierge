// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  ssr: true,

  runtimeConfig: {
    // Private - server-side only (Docker internal network)
    apiBaseInternal: process.env.NUXT_API_BASE_INTERNAL || 'http://localhost:8000/api',
    public: {
      // Public - available both server and client side
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '+998935001234',
      telegram: process.env.NUXT_PUBLIC_TELEGRAM || '@khivatourguide',
    },
  },

  modules: [
    'vuetify-nuxt-module',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'khiva',
        themes: {
          khiva: {
            dark: false,
            colors: {
              primary: '#0D1B2A',
              secondary: '#1B263B',
              accent: '#14B8A6',
              cta: '#F59E0B',
              background: '#F8FAFC',
              surface: '#FFFFFF',
              error: '#DC2626',
              success: '#16A34A',
            },
          },
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'uz', language: 'uz-UZ', name: "O'zbek", file: 'uz.json' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
  },

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://khivatourguide.com',
  },

  robots: {
    groups: [
      { userAgent: ['*'], allow: ['/'], disallow: ['/admin', '/api'] },
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7/css/materialdesignicons.min.css' },
      ],
    },
  },
})
