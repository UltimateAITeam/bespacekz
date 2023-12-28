const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        inter: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        mainBg: '#F3FFFC',
        'mainText': '#1A3353',
        'neutral-4': '#F0F0F0'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

