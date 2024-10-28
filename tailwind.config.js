/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#55D6B0',
        'primary-light': '#AAEBD8',
        'secondary': '#FABC3F',
        'secondary-light': '#FFDBB5',
        'tertiary': '#05467E',
        'tertiary-light': '#ADCFEB',
        'black': '#1E201E',
        'grey': '#6C6C72',
        'cream': '#F7F7F7',
        'blue-light': '#EFF5FB',
        'green-light': '#F7F7F7',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
  ],
}

