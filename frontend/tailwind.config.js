/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        popins: ['"Poppins"', 'sans-serif'],
        montserrat: ['"montserrat"', 'sans-serif'],
      },
      colors: {
        defaultBg: '#F2F2F2', // Add your custom color here
        borderColor: '#1136BA',
        accent : '#94ABBF'
      }
    },
  },
  plugins: [],
}