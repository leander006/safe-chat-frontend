/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path to match your project structure
  ],
  theme: {
    
    extend: {
      animation: {
        bounce: 'bounce 2s infinite',
        bounceAlt: 'bounce-alt 2s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%) scale(1)' },
          '50%': { transform: 'translateY(5%) scale(1.1)' },
        },
        bounceAlt: {
          '0%, 100%': { transform: 'translateY(5%) scale(1)' },
          '50%': { transform: 'translateY(-5%) scale(1.1)' },
        },
      },
      colors: {
        primary: '#C147E9',
        secondary: '#810CA8',
        background:'#5409DA',
        light: '#E5B8F4',
        silver : '#ecebff',
      }
    },
  },
  plugins: [],
};
