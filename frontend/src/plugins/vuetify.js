import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

export default createVuetify({
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
          warning: '#F59E0B',
          info: '#0EA5E9',
        },
      },
    },
  },
  defaults: {
    VCard: { rounded: 'lg', elevation: 1 },
    VBtn: { rounded: 'lg' },
    VTextField: { variant: 'outlined', density: 'comfortable' },
    VSelect: { variant: 'outlined', density: 'comfortable' },
    VTextarea: { variant: 'outlined', density: 'comfortable' },
  },
})
