/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌿 Brand Colors
        primary: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          dark: '#0284C7',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
          glass: 'rgba(255, 255, 255, 0.7)',
        },
        // 🌈 UI States
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#22C55E',
      },

      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },

      boxShadow: {
        glow: '0 0 20px rgba(16,185,129,0.4)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'soft-xl': '0 20px 40px -15px rgba(0,0,0,0.05)',
      },

      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
        'card-gradient': 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
        'mesh': 'radial-gradient(at 40% 20%, hsla(158,84%,54%,0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(199,89%,48%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.2) 0px, transparent 50%)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
