module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '375px',
      sm: '576px',
      md: '768px',
      lg: '9991px',
      xl: '1220px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
