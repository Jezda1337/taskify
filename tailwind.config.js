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
      test: "var(--color-red)",
      primary: "var(--color-primary)",
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
};
