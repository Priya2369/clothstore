/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce8e6',
          200: '#f9d4d1',
          300: '#f4b4ae',
          400: '#ec8a80',
          500: '#e06356',
          600: '#cb4437',
          700: '#aa362b',
          800: '#8d3028',
          900: '#762d27',
          950: '#401410',
        },
        accent: {
          50: '#faf8f0',
          100: '#f3efdc',
          200: '#e6ddb8',
          300: '#d6c68d',
          400: '#c7ad66',
          500: '#ba9849',
          600: '#a47d3c',
          700: '#886133',
          800: '#714f30',
          900: '#60432b',
          950: '#362315',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
