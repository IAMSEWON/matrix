/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/screens/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5BC0DE',
        secondary: "#f5f5f5",
        destructive: "#FF3B30",
        matrix: "#d9d9d9",
      },
      fontFamily: {
        'gowun-batang-regular': ['GowunBatang-Regular'],
        'gowun-batang-bold': ['GowunBatang-Bold'],
      },
    },
  },
  plugins: [],
};
