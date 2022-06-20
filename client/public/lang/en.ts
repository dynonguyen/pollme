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
			link: '/new-poll',
			label: 'New poll',
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
		search: 'Enter keyword or [tag]',
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
		createVoteFailed: 'Create a failed poll, please try again 😢',
		createVoteSuccess: 'Create successfully 😙',
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
				{ title: 'Newest', key: '-createdAt' },
				{ title: 'Oldest', key: 'createdAt' },
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
		newPoll: {
			title: 'Create a new poll',
			addOptionBtn: 'Add Option',
			submitBtn: 'Create Poll',
			basic: 'Basic',
			advance: 'Advance',
			fieldLabels: {
				title: 'Title',
				desc: 'Description',
				tags: `Max ${MAX.VOTE_TAG} tags`,
				answers: `Answer Options (max ${MAX.ANSWER_OPTIONS} options)`,
				type: 'Poll Type',
				isPrivate: 'Private (only via direct link)',
				reCaptcha: 'reCAPTCHA',
				ipCheck: 'IP Duplication Check',
				loginRequired: 'Login Required',
				showResult: 'Show result',
				allowAddOption: 'Allow add option',
				showResultBtn: 'Show result button',
				maxVote: 'Max Vote',
				endDate: 'End date',
				maxScore: 'Max Score',
			},
			labelHelp: {
				isPrivate:
					'Only you and the people you share the link with can see and vote.',
				reCaptcha: 'Allows only humans to vote. No Bots !',
				ipCheck:
					'Allows only one vote per IP address. Very secure, but might limit voters on the same network.',
				showResult:
					'Show the results of the vote right on your answers as others visit',
				showResultBtn:
					'Displays the results view button, if the "Show results" option is not selected. Viewers only see results when they press the results view button',
				allowAddOption: 'Allow others to add their options to your options',
				maxVote:
					'The maximum number of votes, after reaching this number, the poll will be closed..',
				endDate:
					"The end date of the poll. If you don't choose, the poll won't close by default.",
			},
			placeholder: {
				title: 'Enter the poll title here',
				desc: 'Description for others to understand your poll',
				tags: 'Enter the tag & press Enter',
				answerOption: 'Option',
			},
			fieldError: {
				title: `Please enter the title, max length is ${MAX.VOTE_TITLE} characters!`,
				desc: `Max length of description is ${MAX.VOTE_DESC} characters!`,
				tags: `Please enter at least 1 tag, max ${MAX.VOTE_TAG} tag!`,
				answers: `At least 2 options (no duplication and no vacancy), the most ${MAX.ANSWER_OPTIONS} option! Each option is max ${MAX.OPTION_LABEL} characters.`,
			},
		},
		poll: {
			addOption: 'Add option',
			showResultBtn: 'Show Result',
			submit: 'Submit Vote',
			comment: 'Comments',
			requiredLogin: 'Log in to submit',
			votingSuccess: 'Vote successfully !',
			votingFailed: 'Vote failed !',
		},
		faq: {
			title: 'Frequently asked questions',
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
		newPoll: {
			pathname: '/new-poll',
			title: 'Tạo khảo sát',
			desc: `With just a few simple steps, you can immediately create a survey on ${APP_NAME}. There's a lot of customization for the survey, let's experience it now.`,
		},
		faq: {
			pathname: '/faq',
			title: 'Frequently asked questions - FAQs',
			desc: `FAQs Where to answer all people's frequently asked questions and questions about the ${APP_NAME} app.`,
		},
	},
	others: {
		loginOAuthBreak: 'Or continue with',
		poll: 'Polls',
		closed: 'Closed',
		loadMoreComment: 'Load more comments',
		loading: 'Loading ...',
	},
	components: {
		TagInput: {
			inputPlaceholder: 'Enter tag & press Enter',
		},
		AnswerOptions: {
			photoSize: `The maximum size of the photo is ${MAX.OPTION_PHOTO_SIZE}MB, the appropriate size is 300px x 300px`,
		},
		LinkShare: {
			title: 'Share the poll with your friends',
			copy: 'Copy',
			copied: 'Copied',
			downloadQRCode: 'Download QR Code',
			or: 'Or Scan QR Code',
		},
		CreatePollSuccess: {
			title: 'Congratulations !',
			subTitle: 'The poll has been created',
		},
		CommentBox: {
			addComment: 'Add Your Comment',
			addCommentPlaceholder: 'Enter your comment here',
			charLeft: 'Characters left',
			submitCommentBtn: 'Submit Comment',
			loginToComment: 'Login to comment',
			commentSuccess: 'Comment successfully',
			commentFailed: 'Comment failed',
		},
	},
	helper: {
		pollTypes: [
			'Choose a single option.',
			'Allows multiple options to be selected.',
			'Sort the options according to the level you want.',
			'Allow grading on your choice.',
		],
	},
	faqs: [
		{
			question: `What is ${APP_NAME}?`,
			answer: `${APP_NAME} is a website that allows you to easily create a poll. Explore people's poll, directly vote favorite poll, comment, give comments on poll in real time, and it's completely free.`,
		},
		{
			question: `Is ${APP_NAME} free of charge?`,
			answer: `Yes, the entire ${APP_NAME} offer is available free of charge. We believe that essential features of the site should never be limited by the introduction of premium content. Although an option to disable advertising for participants by paying a fee may be available in the near future.`,
		},
		{
			question: 'How many participants can vote in a poll?',
			answer: `There is no limit to the number of people who can vote in a poll of ${APP_NAME}. However, you can easily setting the maximum number of participants. When this number is reached, the poll will close.`,
		},
		{
			question: 'Can I share images and links from a poll?',
			answer: `Yes, the polls on ${APP_NAME} are made to be shared. However, it is helpful to share not only a screenshot, but also the link to it so others can see the live result.`,
		},
		{
			question: 'What happens to my data?',
			answer:
				'We do not evaluate the contents of polls or pass them on to third parties. We store the personal data securely in a data center near Ho Chi Minh city, VietNam.',
		},
		{
			question: `What types of polls are available on ${APP_NAME}?`,
			answer:
				'We offer the ability to customize your survey very high with types of surveys such as single choice, multiple choice, ranked choice, etc.',
		},
	],
};
