/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        chameleon: "#38b26f",
        emerald: {
          50: "#f3faf3",
          100: "#e3f5e4",
          200: "#c8eaca",
          300: "#9cd9a0",
          400: "#69bf6f",
          500: "#44a34b",
          600: "#34853a",
          700: "#2c6931",
          800: "#26532a",
          900: "#214625",
          950: "#0e2510"
        }
      },
    },
  },
  plugins: [],
};
