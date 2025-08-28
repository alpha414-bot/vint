/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.12)",
        chameleon: "#38b26f",
        main: {
          50: '#ebf2ff',
          100: '#dae8ff',
          200: '#bcd3ff',
          300: '#93b4ff',
          400: '#6989ff',
          500: '#4660ff',
          600: '#2632ff',
          700: '#1a22e8',
          800: '#171fad',
          900: '#1d2692',
          950: '#111455',
        },
        zenos: {
          50: "#fff8ec",
          100: "#fff0d3",
          200: "#ffdda6",
          300: "#ffc46e",
          400: "#ff9f33",
          500: "#ff820c",
          600: "#fc6902",
          700: "#ca4c04",
          800: "#a03b0c",
          900: "#81330d",
          950: "#461704",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

