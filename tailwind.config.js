/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#dce3f1',
        'background': '#0a101a',
        'primary': '#99afd7',
        'secondary': '#583280',
        'accent': '#a85dc0',
      },
    },
  },
  plugins: [],
}