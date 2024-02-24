/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {

         colors: {
            primary: "#0f172a",
            secondary: "#94A1B2"
         },
        
         fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          montserrat: ["Montserrat", "sans-serif"],
        }
    },
  },
  plugins: [],
}

