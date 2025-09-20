/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // add this if you’re using Next.js 13+ app dir
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6f3cff",
          dark: "#4a22cc",
          light: "#a997ff"
        }
      }
    },
  },
  plugins: [],
};
