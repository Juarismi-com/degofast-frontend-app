/** @type {import('tailwindcss').Config} */

// Identidad de marca "boleta.digital":
// negro puro (#000000), coral vibrante (#FF4D5A) y grises del isotipo
// (#EBEBEB hoja, #9E9A9E doblez, #B3B3B3 texto secundario).
const coral = {
   50: "#FFF0F1",
   100: "#FFDBDE",
   200: "#FFBDC1",
   300: "#FF949B",
   400: "#FF707A",
   500: "#FF4D5A",
   600: "#FB3744",
   700: "#F31625",
   800: "#CC1420",
   900: "#9B1720",
   950: "#541216",
};

const brandGray = {
   50: "#FAFAFA",
   100: "#F4F4F4",
   200: "#EBEBEB",
   300: "#CFCFCF",
   400: "#B3B3B3",
   500: "#9E9A9E",
   600: "#7D797D",
   700: "#5A575A",
   800: "#383638",
   900: "#1F1D1F",
   950: "#000000",
};

module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./node_modules/vue-tailwind-datepicker/**/*.js",
   ],
   theme: {
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
      extend: {
         colors: {
            coral,
            gray: brandGray,
            // El resto del sitio usaba morado/índigo/azul/rosa como color de
            // acento sin distinción semántica real: quedan alias del coral
            // de marca para que todo el sitio comparta un único acento.
            purple: coral,
            indigo: coral,
            pink: coral,
            blue: coral,
         },
      },
   },
   plugins: [require("@tailwindcss/forms")],
};
