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
			analytics: ['Poll', 'Active user', 'Hashtag', 'Comment'],
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
	},
	pageSEO: {
		home: {
			pathname: '/',
			title: 'Home Page',
			desc: 'Pollme - A great app that lets you easily create surveys as quickly, efficiently as possible. Pollme provides a beautiful, easy-to-use and user-friendly interface.',
		},
		register: {
			pathname: '/register',
			title: 'Register',
			desc: 'With just a few simple steps, you can immediately register yourself for an account in Pollme so you can create surveys, help others survey now.',
		},
		login: {
			pathname: '/login',
			title: 'Log in',
			desc: 'Sign in to Pollme to experience the great features this app has to offer you.',
		},
	},
};
