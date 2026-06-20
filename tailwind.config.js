/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF6F0', // Soft creamy base
        card: '#FFFFFF', 
        primary: '#1F2922', // Deep charcoal/forest green for serif text
        muted: '#5A665E', // Muted sage green
        accent: {
          mint: '#D1EAE2', // Soft pastel mint
          peach: '#FDE9D6', // Soft peach
          gold: '#B2976D', // Elegant thin border gold
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FDE9D6 0%, #FAF6F0 40%, #D1EAE2 100%)',
      },
      boxShadow: {
        'neumorphic': '10px 10px 20px rgba(180, 190, 185, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.9)',
        'neumorphic-hover': '15px 15px 30px rgba(180, 190, 185, 0.4), -15px -15px 30px rgba(255, 255, 255, 1)',
        'neumorphic-inset': 'inset 5px 5px 10px rgba(180, 190, 185, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.9)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
