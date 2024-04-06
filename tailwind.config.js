/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#eff0f2",
        background: "#0d0f13",
        primary: "#afb6ce",
        secondary: "#374268",
        accent: "#697bba",
      },
    },
  },
  plugins: [],
};
