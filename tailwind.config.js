module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'black': '#2B4964',
        'grey-darkest': '#626471',
        'grey-darker': '#8788c98',
        'grey-dark': '#adb4c2',
        'grey': '#d5d9e3',
        'grey-light': '#dee1e8',
        'grey-lighter': '#eaebef',
        'grey-lightest': '#fcfcfc',
        'primary': '#2b79c1',
        'primary-dark': '#266299'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
