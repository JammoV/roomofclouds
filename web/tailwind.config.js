module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#539EA5',
        'green-light': '#EEF6F6',
        'dark': '#444444',
        'grey': '#3C484B',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      yuji: ['Yuji Syuku', 'serif'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
