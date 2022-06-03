module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '375px',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px',
		},
		extend: {
			colors: {
				// light mode
				primary: '#2d8bba',
				secondary: '#41b8d5',
				accent: '#f260cd',
				text_title: '#0f172a',
				text_primary: '#334155',

				// dark mode
				d_bg: '#193151',
				d_primary: '#3aa8df',
				d_secondary: '#2dadcc',
				d_accent: '#ef40c3',
				d_text_title: '#e2e8f0',
				d_text_primary: '#94a3b8',
			},

			fontFamily: {
				inter: ['Inter', 'Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
