/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0369a1",
        danger: "#dc2626",
        warning: "#d97706",
        safe: "#16a34a",
      },
    },
  },
  plugins: [],
};
