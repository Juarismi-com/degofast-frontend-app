// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   ssr: false,
   devtools: { enabled: false },
   modules: ["@pinia/nuxt"],
   css: ["~/assets/css/main.css"],
   /**
    * @todo mejorar como se
    */
   runtimeConfig: {
      public: {
         API_URL: process.env.API_URL || "http://localhost:8000",
      },
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
});
