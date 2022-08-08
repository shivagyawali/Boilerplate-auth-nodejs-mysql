/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/views/**/*.ejs"],
  darkMode:false,
  theme: {
    extend: {
      colors: {
        primary: "#972521",
        secondary: "#167C98",
      },
      fontFamily: {
        body: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
