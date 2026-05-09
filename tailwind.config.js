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
        navy: {
          50:  '#e8edf5',
          100: '#c5d0e4',
          500: '#2a5298',
          600: '#1e3f7a',
          700: '#1B3A6B',
          800: '#132d55',
          900: '#0c1f3d',
        },
        teal: {
          50:  '#e0f4f4',
          100: '#b3e3e3',
          400: '#18a9a8',
          500: '#0E7C7B',
          600: '#0b6565',
          700: '#084f4f',
        },
        gold: {
          300: '#f0c84a',
          400: '#e8b420',
          500: '#D4A017',
          600: '#b88a13',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(27,58,107,0.85) 0%, rgba(14,124,123,0.75) 100%)',
      },
    },
  },
  plugins: [],
};
