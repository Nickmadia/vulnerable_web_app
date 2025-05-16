import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',  // Importing Bootstrap CSS
  ],
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          integrity: 'sha384-ENjdO4Dr2bkBIFxQpeoTf2eNlYgIR3zFtrw6z9U5wCw7v1S5nCTpuj/zy4C+OGpG',
          crossorigin: 'anonymous'
        }
      ]
    }
  },hooks: {
      'build:before': async () =>  {
      const { initDB } = await import('./server/database/init.js')
      await initDB()
    }
  }
}
)
