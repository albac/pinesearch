/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poping: ["Poppins", "sans-serif"],
        pt_serif: ["PT Serif", "serif"]
      },
      colors: {
        "fig-dark": "#000F08",
        "fig-primary": "#1C3738",
        "fig-mint": "#F4FFF8",
        "fig-gray": "#4D4847",
        "fig-teal": "#8BAAAD",
        "fig-ligth-mint": "#F9FCFA",
        "fig-grey-mint": "#F2F5F4"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
    // ...
  ]
};
