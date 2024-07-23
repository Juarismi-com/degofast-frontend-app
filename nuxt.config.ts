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
         DEGOFAST_RUCPY_API: process.env.DEGOFAST_RUCPY_API,
         APP_ENV: process.env.APP_ENV || "dev",
      },
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },
   app: {
      head: {
         script: [
            {
               src: "~/node_modules/flowbite/dist/flowbite.min.js",
            },
         ],
      },
   },
});
