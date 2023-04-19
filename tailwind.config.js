/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        darkergrotesque: ["DarkerGrotesque", "sans-serif"],
      },
    },
    colors: {
      background: "#f2f2f2",
      current: "currentColor",
      gray: "rgb(212 212 212)",
      pink: "#e13868",
      white: "#fafafa",
    },
  },
  plugins: [],
};
