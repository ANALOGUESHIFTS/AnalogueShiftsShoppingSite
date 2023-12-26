/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        PrimaryBlack: "#252525",
        PrimaryOrange: "#e7ab3c",
      },
      zIndex: {
        70: 70,
        80: 80,
      },
      animation: {
        fadeIn: "fadeIn 0.3s 1",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
