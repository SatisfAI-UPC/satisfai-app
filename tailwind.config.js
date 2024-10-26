/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        thin: ['Thin'],
        regular: ['Regular'],
        medium: ['Medium'],
        semibold: ['SemiBold'],
        bold: ['Bold'],
        black: ['Black'],
      },
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
  plugins: [],
}

