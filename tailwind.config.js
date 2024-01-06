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
        'dm-sans': ['var(--font-dm-sans)', ...fontFamily.sans],
      },
      colors: {
        mainBg: '#F3FFFC',
        firstStepsBg: '#F0F5FF',
        'mainText': '#1A3353',
        'neutral-4': '#F0F0F0',
        'primary-10': '#002766'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

