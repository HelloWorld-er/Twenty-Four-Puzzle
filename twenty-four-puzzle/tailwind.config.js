/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "play-card-bg": "url('/src/assets/play-card-bg.svg')",
      },
      animation: {
        "vertical-marquee": "vertical-marquee 200s linear infinite",
        "horizontal-marquee": "horizontal-marquee 200s linear infinite",
        "spinning-wheel": "spinning-wheel 50s linear infinite"
      },
      keyframes: {
        "vertical-marquee": {
          from: {translateY: "0"},
          to: {translateY: "-100%"},
        },
        "horizontal-marquee": {
          from: {translateX: "0"},
          to: {translateX: "-100%"},
        },
        "spinning-wheel": {
          from: {rotate: "0deg"},
          to: {rotate: "360deg"},
        }
      }
    },
  },
  plugins: [],
}

