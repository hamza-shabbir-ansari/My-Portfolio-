/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#f59e0b",
        c2: "#fbbf24",
        c3: "#14b8a6",
        accent: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          cyan: "#14b8a6",
          glow: "rgba(245, 158, 11, 0.25)",
        },
        background: {
          DEFAULT: "#050811",
          dark: "#020409",
          surface: "#0a101d",
          card: "#0e1626",
        },
        night: {
          950: "#03060e",
          900: "#060b17",
          850: "#0a1222",
          800: "#0f1a30",
          700: "#172745",
        },
        cream: {
          50: "#fdfbf7",
          100: "#f7f4ed",
          200: "#ebe5d8",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        sans: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        cinematic: "0.2em",
        wideheader: "0.08em",
      },
    },
  },
  plugins: [],
};
