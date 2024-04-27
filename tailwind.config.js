/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.js",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
