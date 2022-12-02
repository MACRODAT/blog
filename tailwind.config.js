/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '1px 4px 5px rgba(210, 240, 210, 0.25)',
        '3xl-h': '4px 8px 9px rgba(210, 240, 210, 0.35)',
      }
    },
  },
  plugins: [],
}
