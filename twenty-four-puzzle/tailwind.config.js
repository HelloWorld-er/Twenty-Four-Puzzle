/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "play-card-bg": "url('/src/assets/play-card-bg.svg')",
      },
      animation: {
        "vertical-marquee": "vertical-marquee 200s linear infinite",
      },
      keyframes: {
        "vertical-marquee": {
          "0%": {transform: "translateY(0)"},
          "100%": {transform: "translateY(-100%)"},
        },
      }
    },
  },
  plugins: [],
}

