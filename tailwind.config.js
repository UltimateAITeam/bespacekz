/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#F3FFFC',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

