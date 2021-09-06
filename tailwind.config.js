module.exports = {
  purge: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.tsx",
    "./resources/**/*.ts",
    "./resources/**/*.vue",
    "./resources/**/*.css",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-bg": "#f7f8fc",
        "gold": "#ffcc00",
        "goethe": "#a0c814"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
