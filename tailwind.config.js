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
        'logo': ['Josefin Sans', 'sans-serif'],
        'heading': ['Josefin Sans', 'sans-serif'],
        'body': ['Amatic SC', 'cursive', 'system-ui', 'sans-serif'],
        'hebrew': ['Amatic SC', 'Assistant', 'cursive', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-glow-light': 'pulse-glow-light 3s ease-in-out infinite',
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
        'pulse-glow-light': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(246, 109, 206, 0.3), 0 0 10px rgba(246, 109, 206, 0.2)'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(246, 109, 206, 0.4), 0 0 20px rgba(246, 109, 206, 0.3)'
          },
        },
      },
    },
  },
  plugins: [],
}

