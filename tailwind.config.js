/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: "var(--color-primary)",
      background: "var(--color-background)",
      text: "var(--color-text)",
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
};
