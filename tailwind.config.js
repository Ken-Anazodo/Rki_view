/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",  // Tells Tailwind to scan your React files
	  "./src/**/*.css",
	],
	theme: {
	  extend: {},
	},
	plugins: [],
  }