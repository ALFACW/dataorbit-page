/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orbit: {
          dark: '#080C14',
          surface: '#0F1626',
          border: '#1E293B',
          blue: {
            DEFAULT: '#2563EB',
            light: '#3B82F6',
            hover: '#1D4ED8',
            glow: '#60A5FA',
            soft: '#EFF6FF',
          },
          accent: '#6366F1',
          cardLight: '#DCE4FF',
          bgLight: '#F3F5F9',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'orbit-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'orbit-rotate': 'orbit-rotate 25s linear infinite',
        'orbit-rotate-reverse': 'orbit-rotate 35s linear infinite reverse',
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
