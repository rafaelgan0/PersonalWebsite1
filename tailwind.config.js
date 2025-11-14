/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dessert-themed palette
        latte: {
          DEFAULT: '#f8f4ef',
          50: '#fdfcfb',
          100: '#f8f4ef',
          200: '#f2ebe3',
          300: '#e8dfd4',
          400: '#ddd0c0',
          500: '#c9b89f',
        },
        macaron: {
          pink: '#ffb3d9',
          lavender: '#c5b9e6',
          pistachio: '#b8d8ba',
          peach: '#ffd6ba',
          mint: '#c3f0d3',
        },
        chocolate: {
          DEFAULT: '#4b3427',
          50: '#f5f3f1',
          100: '#d4c5bb',
          200: '#a89179',
          300: '#7d6049',
          400: '#644a35',
          500: '#4b3427',
          600: '#3d2a1f',
          700: '#2f2018',
          800: '#221712',
          900: '#15100d',
        },
        frosting: {
          glass: 'rgba(255, 255, 255, 0.6)',
          cream: '#fffef9',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dessert': 'linear-gradient(135deg, #f8f4ef 0%, #ffb3d9 50%, #c5b9e6 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'dessert': '0 4px 20px rgba(255, 179, 217, 0.15)',
        'dessert-lg': '0 10px 40px rgba(255, 179, 217, 0.2)',
        'chocolate': '0 4px 15px rgba(75, 52, 39, 0.1)',
      },
      borderRadius: {
        'dessert': '20px',
        'macaron': '30px',
      },
    },
  },
  plugins: [],
}

