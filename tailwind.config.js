/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0e0e0e",
          warm: "#1a1614",
        },
        accent: {
          gold: "#c4a882",
          light: "#e8d5bf",
        },
        text: {
          main: "#f5f0eb",
          muted: "#8a827a",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
        code: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}
