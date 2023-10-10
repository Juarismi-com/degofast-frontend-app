// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  /**
   * @todo mejorar como se 
   */
  runtimeConfig:{
   public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000'
   }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
