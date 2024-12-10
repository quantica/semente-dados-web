import { colors } from 'semente-js'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif']
      },
      colors: {
        ...colors
      }
    }
  },
  plugins: [require('@thoughtbot/tailwindcss-aria-attributes')]
}
