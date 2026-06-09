/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '481px',
      'md': '641px',
      'lg': '769px',
      'xl': '1025px',
    },
    extend: {
      colors: {
        saffron: '#FF6B00',
        gold: '#D4AF37',
        ivory: '#FFFFF0',
        darkbrown: '#3B1F0A',
        cream: '#FFF8E7',
        lightgold: '#F5E6C8',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        pop: 'pop 0.3s ease-in-out',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
      },
      backgroundImage: {
        'pattern-dots': 'radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        'pattern-dots': '20px 20px',
      }
    },
  },
  plugins: [],
}
