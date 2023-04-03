/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /react-flow/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
};

module.exports = config;
