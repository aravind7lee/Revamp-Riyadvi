/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E6AD',
          DEFAULT: '#D4AF37',
          dark: '#AA8825',
          accent: '#E6C453'
        },
        dark: {
          pure: '#000000',
          bg: '#000000',
          surface: '#0B0B0B',
          card: '#0F0F0F',
          elevated: '#161616',
          border: '#1F1F1F',
          muted: '#999999'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'gold-subtle': '0 4px 20px rgba(212, 175, 55, 0.12)',
        'card-subtle': '0 4px 24px rgba(0, 0, 0, 0.8)',
        'premium': '0 10px 30px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E6AD 0%, #D4AF37 50%, #B89324 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
        'card-gradient': 'linear-gradient(180deg, #0F0F0F 0%, #080808 100%)',
      }
    },
  },
  plugins: [],
}

