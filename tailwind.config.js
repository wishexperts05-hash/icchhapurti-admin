/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      boxShadow: {
        right: '4px 0 8px -2px rgba(0, 0, 0, 0.1)', // X-offset = 4px, only to the right
      },

     keyframes: {
    fadeUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-6px)' },
    },
        slideFromLeft: {
          '0%': { transform: 'translateX(-100%)' },   // Start from left
          '100%': { transform: 'translateX(-50%)' }, // Stop at the center
        },
  },
  animation: {
    fadeUp: 'fadeUp 0.6s ease forwards',
    float: 'float 3s ease-in-out infinite',
        slideFromLeft: 'slideFromLeft 2s ease-out forwards', 
  },
},
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',     // IE & Edge
          'scrollbar-width': 'none',        // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',                  // Chrome, Safari, Opera
        },
      });
    },
  ],
}