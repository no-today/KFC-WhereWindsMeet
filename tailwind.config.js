/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      colors: {
        'yanyun-dark': '#1c1c1c',
        'yanyun-paper': '#f0eee5',
        'yanyun-red': '#8a2be2', 
        'yanyun-ink': '#2b2b2b',
        'yanyun-gold': '#cca46a',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'success-bump': 'successBump 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        successBump: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.2)', boxShadow: '0 0 20px rgba(204,164,106,0.8)' },
        }
      }
    },
  },
  plugins: [],
}