module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// light mode
				primary: '#2d8bba',
				secondary: '#41b8d5',
				accent: '#f260cd',
				'text-title': '#0f172a',
				'text-primary': '#334155',

				// dark mode
				'dark-bg': '#0f172a',
				'dark-primary': '#287da7',
				'dark-secondary': '#2dadcc',
				'dark-accent': '#ef40c3',
				'dark-title': '#e2e8f0',
				'dark-primary': '#94a3b8',
			},

			fontFamily: {
				inter: ['Inter', 'Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
