/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--color-white, #ffffff)',
        gray: {
          900: 'var(--color-gray-900, #111827)',
        },
      },
    },
  },
  plugins: [],
};
