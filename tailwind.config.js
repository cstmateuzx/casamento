/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#E8DCCB',
          300: '#DBC7AC',
          400: '#C8A982',
          500: '#B68E5C',
          600: '#9B7443',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E4ECE4',
          500: '#68826D',
          700: '#465A4A',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
