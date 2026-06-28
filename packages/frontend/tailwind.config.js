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
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        navy: {
          50: '#e8edf5',
          100: '#c5d0e3',
          200: '#a3b5d1',
          300: '#8099bf',
          400: '#5d7ead',
          500: '#3a639b',
          600: '#2a4a7a',
          700: '#1a3159',
          800: '#0a1929',
          900: '#060d18',
        }
      },
    },
  },
  plugins: [],
}