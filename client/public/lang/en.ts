import { VoteFilterOptions } from '../../constants/enum';
import { MAX, MIN } from '../../constants/validation';
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
			link: '/tags',
			label: 'Tags',
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
		logout: 'Log out',
	},
	placeholder: {
		defaultSelect: 'Choose an option',
		search: 'Search',
	},
	accountMenu: [
		{
			to: '/my-polls',
			title: 'My Polls',
		},
		{
			to: '/account-settings',
			title: 'Account Settings',
		},
	],
	messages: {
		logoutSuccess: 'Logout Successful',
	},
	pages: {
		notfound: {
			title: "Sorry we couldn't find this page.",
			subTitle:
				'But dont worry, you can find plenty of other things on our homepage.',
			backHomeBtn: 'back to home page',
		},
		home: {
			link: '/',
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
			analytics: ['Poll', 'Active user', 'Tag', 'Comment'],
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
		register: {
			link: '/register',
			subTitle: 'Enter your information to register',
			fields: {
				email: {
					label: 'Email',
					errors: {
						required: 'Email is required !',
						format: 'The email you entered is incorrect.',
						max: `The maximum length of email is ${MAX.EMAIL_LEN} characters.`,
					},
				},
				name: {
					label: 'Full name',
					errors: {
						required: 'Full name is required !',
						max: `The maximum length of full name is ${MAX.USERNAME_LEN} characters.`,
					},
				},
				password: {
					label: 'Password',
					errors: {
						required: 'Password is required !',
						min: `The minimum length of password is ${MIN.PASSWORD_LEN} characters.`,
						max: `The maximum length of password is ${MAX.PASSWORD_LEN} characters.`,
					},
				},
				confirmPwd: {
					label: 'Confirm Password',
					errors: {
						noMatch: 'Password does not match',
					},
				},
			},
			submitBtn: 'Register',
			message: {
				failed: 'Registration failed. Try again.',
				success: 'Registration successful.',
			},
		},
		login: {
			link: '/login',
			subTitle: 'Enter your information to register',
			fields: {
				email: {
					label: 'Email',
					errors: {
						required: 'Email is required !',
						format: 'The email you entered is incorrect.',
						max: `The maximum length of email is ${MAX.EMAIL_LEN} characters.`,
					},
				},

				password: {
					label: 'Password',
					errors: {
						required: 'Password is required !',
						min: `The minimum length of password is ${MIN.PASSWORD_LEN} characters.`,
						max: `The maximum length of password is ${MAX.PASSWORD_LEN} characters.`,
					},
				},
			},
			submitBtn: 'Login',
			message: {
				failed: 'Login failed. Try again.',
				success: (username: string) => `Hello, ${username} 👋`,
			},
		},
		discover: {
			link: '/discover',
			title: `${APP_NAME} Discover`,
			sortOptions: [
				{ title: 'By default', key: '' },
				{ title: 'Title (A-Z)', key: 'title' },
				{ title: 'Title (Z-A)', key: '-title' },
				{ title: 'Vote Ascending', key: 'totalVote' },
				{ title: 'Vote Descending', key: '-totalVote' },
				{ title: 'Comment Ascending', key: 'totalComment' },
				{ title: 'Comment Descending', key: '-totalComment' },
				{ title: 'Newest', key: 'createdAt' },
				{ title: 'Oldest', key: '-createdAt' },
			],
			filterOptions: [
				{ title: 'All', key: VoteFilterOptions.ALL },
				{ title: 'Unvote', key: VoteFilterOptions.UNVOTE },
				{ title: 'Active', key: VoteFilterOptions.ACTIVE },
				{ title: 'Closed', key: VoteFilterOptions.CLOSED },
			],
			pollNotfound: 'No polls found',
		},
		tags: {
			link: '/tags',
			sortOptions: [
				{ title: 'By default', key: '' },
				{ title: 'Popular', key: '-totalVote' },
				{ title: 'By name (A-Z)', key: 'name' },
				{ title: 'By name (Z-A)', key: '-name' },
			],
			pollNotfound: 'Not tags found',
		},
	},
	pageSEO: {
		home: {
			pathname: '/',
			title: 'Home Page',
			desc: `${APP_NAME} - A great app that lets you easily create surveys as quickly, efficiently as possible. ${APP_NAME} provides a beautiful, easy-to-use and user-friendly interface.`,
		},
		register: {
			pathname: '/register',
			title: 'Register',
			desc: `With just a few simple steps, you can immediately register yourself for an account in ${APP_NAME} so you can create surveys, help others survey now.`,
		},
		login: {
			pathname: '/login',
			title: 'Log in',
			desc: `Sign in to ${APP_NAME} to experience the great features this app has to offer you. Easy login with Google, Github.`,
		},
		discovery: {
			pathname: '/discover',
			title: 'Discover',
			desc: `Let's explore the surveys that are most interested in ${APP_NAME}, maybe you are also interested in it.`,
		},
		tags: {
			pathname: '/tags',
			title: 'Tags',
			desc: `A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.`,
		},
	},
	others: {
		loginOAuthBreak: 'Or continue with',
		poll: 'Polls',
		closed: 'Closed',
	},
};
