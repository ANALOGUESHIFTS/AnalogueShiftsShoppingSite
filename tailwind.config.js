/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "PrimaryBlack": "#252525",
        "PrimaryOrange": "#e7ab3c"
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s 1',
      },
   
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': {opacity: 1, transform: 'translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}

