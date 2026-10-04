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
          50: '#FEFDF8',
          100: '#FEF9C3', // amarelo bem claro
          200: '#FEF08A', // amarelo suave
          300: '#FDE047',
          400: '#EAB308',
          500: '#CA8A04',
          600: '#A16207',
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
