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
        accent : '#94ABBF',
        accent2 : '#576DBC',
        grey2: '#f0f0f0'
      },
      borderWidth: {
        '1': '1px',
        '1.5': '1.3px',
        
      },
      width:{
        '100': '500px'
      },
      marginTop:{
        '100': '400px'
      }
    },
  },
  plugins: [],
}