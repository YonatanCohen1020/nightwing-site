/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#23262d',
        'bg-dark': '#1a1d23',
        'bg-light': '#2d3239',
        'text-primary': '#b7fef6',
        'accent-pink': '#f66dce',
        'accent-orange': '#fa7e61',
        'accent-peach': '#e3b5a4',
      },
      fontFamily: {
        'logo': ['Montserrat', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        'hebrew': ['Montserrat', 'Assistant', 'Noto Sans Hebrew', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #f66dce' },
          '50%': { boxShadow: '0 0 20px #f66dce, 0 0 30px #f66dce' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 10px #f66dce, 0 0 20px #f66dce'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 20px #f66dce, 0 0 40px #f66dce, 0 0 60px #f66dce'
          },
        },
      },
    },
  },
  plugins: [],
}

