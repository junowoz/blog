/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: [ 'Arial', 'sans-serif' ],
		  }
	},
	plugins: [require('flowbite/plugin')]
};
