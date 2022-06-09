module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '540px',
				md: '720px',
				lg: '960px',
				xl: '1140px',
				'2xl': '1320px',
			},
		},
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
				d_bg: '#0f172a',
				d_bg_hover: '#15203d',
				d_primary: '#50b8d5',
				d_secondary: '#aed7eb',
				d_accent: '#ee9f46',
				d_text_title: '#e9e9e9',
				d_text_primary: '#c1c1c1',
			},

			fontFamily: {
				inter: ['Inter', 'Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
