const defaultTheme = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "gray-bg": "#f7f8fc",
        gold: "#ffcc00",
        goethe: "#a0c814",
      },
    },
  },
  variants: {
    extend: {
      padding: ["odd", "even"],
      backgroundColor: ["odd", "even"],
      borderColor: ["focus-within"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
