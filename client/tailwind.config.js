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
				primary: '#219ebc',
				secondary: '#8ecae6',
				accent: '#fb8500',
				text_title: '#023047',
				text_primary: '#334155',

				// dark mode
				d_bg: '#193151',
				d_primary: '#40b8d5',
				d_secondary: '#aed7eb',
				d_accent: '#ee9f46',
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
