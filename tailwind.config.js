/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C147E9',
        secondary: '#810CA8',
        background:'#2D033B',
        light: '#E5B8F4',
        silver : '#ecebff',
      }
    },
  },
  plugins: [],
};
