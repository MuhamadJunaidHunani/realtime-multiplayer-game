/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        roadScroll: "scroll 3s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { backgroundPositionY: "0%" },
          "100%": { backgroundPositionY: "100%" },
        },
      },
    },
  },
  plugins: [],
}

