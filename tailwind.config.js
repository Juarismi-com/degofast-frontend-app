/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./node_modules/vue-tailwind-datepicker/**/*.js",
      "./node_modules/flowbite/**/*.js",
   ],
   theme: {
      /*colors: {
            blue: '#0A2540',
            skyblue: '#00D4FF',
            silver: '#EEF2FA',
            gray: '#ADBDCC',
            white: '#FFFFFF'
         },*/
      container: {
         // default breakpoints but with 40px removed
         screens: {
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1240px",
            "2xl": "1240px",
         },
      },
      extend: {},
   },
   plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
