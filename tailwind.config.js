const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.red,
      blueish: colors.blueGray,
      blue: colors.blue,
      orange: colors.orange,
      teal: colors.teal,
      rose: colors.rose,
      white: colors.white
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
