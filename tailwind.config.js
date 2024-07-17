/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/screens/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
      fontFamily: {
        'gowun-batang-regular': ['GowunBatang-Regular'],
        'gowun-batang-bold': ['GowunBatang-Bold'],
      },
    },
  },
  plugins: [],
};
