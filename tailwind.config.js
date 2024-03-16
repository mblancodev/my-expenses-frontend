/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: true, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
