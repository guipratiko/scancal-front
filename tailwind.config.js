/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scancal-green': {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
      }
    },
  },
  plugins: [],
}
