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
      animation: {
        // Custom animations for your components
        'gradient': 'gradient 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundSize: {
        'gradient-200': '200% 100%',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Provides hundreds of animation classes
  ],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#fff7ed',
//           100: '#ffedd5',
//           200: '#fed7aa',
//           300: '#fdba74',
//           400: '#fb923c',
//           500: '#f97316',
//           600: '#ea580c',
//           700: '#c2410c',
//           800: '#9a3412',
//           900: '#7c2d12',
//         },
//         navy: {
//           50: '#e8edf5',
//           100: '#c5d0e3',
//           200: '#a3b5d1',
//           300: '#8099bf',
//           400: '#5d7ead',
//           500: '#3a639b',
//           600: '#2a4a7a',
//           700: '#1a3159',
//           800: '#0a1929',
//           900: '#060d18',
//         }
//       },
//     },
//   },
//   plugins: [],
// }