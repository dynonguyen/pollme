import { APP_NAME } from './../../constants/index';

export default {
	title: {
		home: 'Home Page',
		notfound: 'Page Not Found',
	},
	navbarItems: [
		{
			link: '/discover',
			label: 'Discover',
		},
		{
			link: '/new-vote',
			label: 'New vote',
		},
		{
			link: '/about-me',
			label: 'About me',
		},
	],
	button: {
		login: 'Log in',
		register: 'Sign up',
	},
	placeholder: {
		defaultSelect: 'Choose an option',
		search: 'Search',
	},
	pages: {
		notfound: {
			title: "Sorry we couldn't find this page.",
			subTitle:
				'But dont worry, you can find plenty of other things on our homepage.',
			backHomeBtn: 'back to home page',
		},
		home: {
			titleRoles: [
				'one',
				'developer',
				'data scientist',
				'system admin',
				'designer',
			],
			titles: ['Every', `Has A Tab Open To ${APP_NAME}`],
			subTitles: [
				APP_NAME,
				' - The easiest way to create polls and to collect responses on the internet.',
				'Find the best answer to your question, help others answer theirs.',
			],
			buttons: {
				createPoll: 'Create a new poll now',
			},
		},
	},
};
