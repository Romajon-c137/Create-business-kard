/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a1929",
        blockFon: "#011830d5",
        border: "#132f4c",
        contract: "#66b2ff",
      },
    },
  },
  plugins: [],
};