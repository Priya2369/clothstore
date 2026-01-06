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
          300: '#f4b5af',
          400: '#ec8b82',
          500: '#e06358',
          600: '#cb4439',
          700: '#aa352c',
          800: '#8d2f28',
          900: '#752c27',
          950: '#401410',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe6',
          300: '#a7bdd1',
          400: '#789ab7',
          500: '#577e9e',
          600: '#446584',
          700: '#38526b',
          800: '#31465a',
          900: '#2c3d4d',
          950: '#1d2833',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
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
