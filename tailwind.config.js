/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "fig-dark": "#000F08",
        "fig-primary": "#1C3738",
        "fig-mint": "#F4FFF8",
        "fig-gray": "#4D4847",
        "fig-teal": "#2C2C2C",
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
