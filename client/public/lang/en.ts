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
		{
			link: '/faq',
			label: 'FAQ',
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
			introduction: [
				{
					title: 'Easy to create a poll',
					content:
						'With just a few steps, you can create your poll and share it with your friends.',
				},
				{
					title: 'Analysis & reporting',
					content:
						'Analyze poll results through comprehensive dashboards and graphs. Export it all to Excel or PDF.',
				},
				{
					title: 'Simple interface, easy to use',
					content:
						'User-friendly interface, beautiful, easy to use for beginners. Beautiful across all devices and screens.',
				},
			],
			analytics: ['Poll', 'Active user', 'Daily Visitor', 'Comment'],
			featureTitle: 'Best Features',
			features: [
				{
					title: 'Highly Customizable',
					content:
						'It is easy to customize a lot of the properties of a survey.',
				},
				{
					title: 'Public & Private',
					content:
						'You can create a survey for everyone or be private for your team',
				},
				{
					title: 'Discussion',
					content:
						'Pollme allows you to grade your choice and discuss it on that survey',
				},
			],
		},
	},
};
