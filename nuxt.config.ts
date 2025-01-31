// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   ssr: false,
   devtools: { enabled: false },
   modules: ["@pinia/nuxt"],
   css: ["~/assets/css/main.css"],

   runtimeConfig: {
      public: {
         API_URL: process.env.API_URL || "http://api.degofast.com",
         DEGOFAST_RUCPY_API:
            process.env.DEGOFAST_RUCPY_API || "http://localhost:8000",
         APP_ENV: process.env.APP_ENV || "dev",
         DE_SUBMIT_FORM: process.env.DE_SUBMIT_FORM || "de",
         DEGOFAST_SYNC_SQL_API:
            process.env.DEGOFAST_SYNC_SQL_API || "http://localhost:3004/local",
      },
   },

   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },

   compatibilityDate: "2024-10-28",
});
