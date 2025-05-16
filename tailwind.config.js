/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#16a34a',
        accent: '#7c3aed',
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
      scale: {
        105: '1.05',
      },
    },
  },
  plugins: [],
};