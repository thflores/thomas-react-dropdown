/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        select: '#0d6efd',
        highlight: '#9fc3f870',
        selectHighlight: '#0d6efd70'
      }
    }
  },
  plugins: [],
}