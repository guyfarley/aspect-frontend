/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'lustria': ['"Lustria", serif'],
        'laila': ['"Laila", sans-serif'],
        'gruppo': ['"Gruppo", cursive'],
        'inconsolata': ['"Inconsolata", monospace'],
        'alata': ['"Alata", sans-serif'],
        'ptserif': ['"PT Serif", serif'],
        'roboto': ['"Roboto", sans-serif'],
      },
    },
  },
  plugins: [],
}
