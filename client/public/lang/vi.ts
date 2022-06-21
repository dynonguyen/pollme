import { VoteFilterOptions } from '../../constants/enum';
import { MAX, MIN } from '../../constants/validation';
import { APP_NAME } from './../../constants/index';

export default {
	navbarItems: [
		{
			link: '/kham-pha',
			label: 'Khám phá',
		},
		{
			link: '/tags',
			label: 'Tags',
		},
		{
			link: '/tao-khao-sat',
			label: 'Tạo khảo sát',
		},
		{
			link: '/faq',
			label: 'FAQ',
		},
	],
	button: {
		login: 'Đăng nhập',
		register: 'Đăng ký',
		logout: 'Đăng xuất',
		add: 'Thêm',
	},
	placeholder: {
		defaultSelect: 'Chọn một lựa chọn',
		search: 'Nhập từ khoá hoặc [tag]',
	},
	accountMenu: [
		{
			to: '/account/polls',
			title: 'Khảo sát của tôi',
		},
		{
			to: '/account/settings',
			title: 'Cài đặt tài khoản',
		},
	],
	messages: {
		logoutSuccess: 'Đăng xuất thành công',
		createVoteFailed: 'Tạo bài khảo sát thất bại, vui lòng thử lại 😢',
		createVoteSuccess: 'Tạo bài khảo sát thành công 😙',
		addOptionSuccess: 'Thêm lựa chọn thành công 😊',
		addOptionFailed: 'Thêm lựa chọn thất bại, thử lại 😢',
	},
	pages: {
		notfound: {
			title: 'Xin lỗi trang không thể tìm thấy hoặc đang bị hỏng.',
			subTitle:
				'Đừng lo lắng, chúng tôi sẽ sửa chữa sớm nhất có thể, hãy về trang chủ nhé.',
			backHomeBtn: 'Quay về trang chủ',
		},
		home: {
			link: '/',
			titleRoles: [
				'người',
				'nhà phát triển',
				'nhà khoa học',
				'quản trị viên',
				'nhà thiết kế',
			],
			titles: ['Mỗi', `Đều có thể tham gia vào ${APP_NAME}`],
			subTitles: [
				APP_NAME,
				' - Cách dễ nhất để tạo các cuộc khảo sát và thăm dò ý kiến trên internet.',
				'Tìm câu trả lời cho câu hỏi của bạn, giúp người khác trả lời câu hỏi của họ.',
			],
			buttons: {
				createPoll: 'Tạo khảo sát ngay',
			},
			introduction: [
				{
					title: 'Tạo một cuộc khảo sát dễ dàng',
					content:
						'Chỉ với vài bước, bạn có thể tạo một của khảo sát cho riêng mình và chia sẻ nó tới những người bạn của mình.',
				},
				{
					title: 'Phân tích & báo cáo',
					content:
						'Phân tích kết quả thăm dò ý kiến thông qua bảng điều khiển và đồ thị toàn diện. Xuất tất cả sang Excel hoặc PDF.',
				},
				{
					title: 'Giao diện đơn giản, dễ dùng',
					content:
						'Giao diện thân thiện với người dùng, đẹp, dễ sử dụng cho người mới bắt đầu. Đáp ứng tốt trên tất cả các thiết bị và màn hình.',
				},
			],
			analytics: ['Cuộc khảo sát', 'Người dùng', 'Chủ đề', 'Bình luận'],
			featureTitle: 'Tính năng nổi bật',
			features: [
				{
					title: 'Khả năng tuỳ chỉnh cao',
					content:
						'Có thể dễ dàng tùy chỉnh nhiều thuộc tính của một cuộc khảo sát.',
				},
				{
					title: 'Công khai & Riêng tư',
					content:
						'Bạn có thể tạo một khảo sát dành cho tất cả mọi người hoặc riêng tư cho nhóm của bạn',
				},
				{
					title: 'Thảo luận',
					content:
						'Pollme cho phép bạn chấm điểm lựa chọn của mình và thảo luận về nó trong cuộc khảo sát đó',
				},
			],
		},
		register: {
			link: '/dang-ky',
			subTitle: 'Nhập thông tin của bạn để đăng ký',
			fields: {
				email: {
					label: 'Email',
					errors: {
						required: 'Email là bắt buộc !',
						format: 'Email vừa nhập không chính xác.',
						max: `Email tối đa ${MAX.EMAIL_LEN} ký tự.`,
					},
				},
				name: {
					label: 'Họ tên',
					errors: {
						required: 'Họ tên là bắt buộc !',
						max: `Họ tên tối đa ${MAX.USERNAME_LEN} ký tự.`,
					},
				},
				password: {
					label: 'Mật khẩu',
					errors: {
						required: 'Mật khẩu là bắt buộc !',
						min: `Mật khẩu tối thiểu ${MIN.PASSWORD_LEN} ký tự.`,
						max: `Mật khẩu tối đa ${MAX.PASSWORD_LEN} ký tự.`,
					},
				},
				confirmPwd: {
					label: 'Xác nhận mật khẩu',
					errors: {
						noMatch: 'Mật khẩu không trùng khớp',
					},
				},
			},
			submitBtn: 'Đăng ký',
			message: {
				failed: 'Đăng ký thất bại, thử lại.',
				success: 'Đăng ký thành công.',
			},
		},
		login: {
			link: '/dang-nhap',
			fields: {
				email: {
					label: 'Email',
					errors: {
						required: 'Email là bắt buộc !',
						format: 'Email vừa nhập không chính xác.',
						max: `Email tối đa ${MAX.EMAIL_LEN} ký tự.`,
					},
				},
				password: {
					label: 'Mật khẩu',
					errors: {
						required: 'Mật khẩu là bắt buộc !',
						min: `Mật khẩu tối thiểu ${MIN.PASSWORD_LEN} ký tự.`,
						max: `Mật khẩu tối đa ${MAX.PASSWORD_LEN} ký tự.`,
					},
				},
			},
			submitBtn: 'Đăng nhập',
			message: {
				failed: 'Đăng nhập thất bại, thử lại.',
				success: (username: string) => `Xin chào, ${username} 👋`,
			},
		},
		discover: {
			link: '/kham-pha',
			title: `${APP_NAME} Khám phá`,
			sortOptions: [
				{ title: 'Mặc định', key: '' },
				{ title: 'Tiêu đề (A-Z)', key: 'title' },
				{ title: 'Tiêu đề (Z-A)', key: '-title' },
				{ title: 'Lượt vote tăng dần', key: 'totalVote' },
				{ title: 'Lượt vote giảm dần', key: '-totalVote' },
				{ title: 'Bình luận tăng dần', key: 'totalComment' },
				{ title: 'Bình luận giảm dần', key: '-totalComment' },
				{ title: 'Mới nhất', key: '-createdAt' },
				{ title: 'Cũ nhất', key: 'createdAt' },
			],
			filterOptions: [
				{ title: 'Tất cả', key: VoteFilterOptions.ALL },
				{ title: 'Chưa vote', key: VoteFilterOptions.UNVOTE },
				{ title: 'Đang mở', key: VoteFilterOptions.ACTIVE },
				{ title: 'Đã đóng', key: VoteFilterOptions.CLOSED },
			],
			pollNotfound: 'Không tìm thấy khảo sát nào phù hợp',
		},
		tags: {
			link: '/tags',
			sortOptions: [
				{ title: 'Mặc định', key: '' },
				{ title: 'Phổ biến nhất', key: '-totalVote' },
				{ title: 'Theo tên (A-Z)', key: 'name' },
				{ title: 'Theo tên (Z-A)', key: '-name' },
			],
			pollNotfound: 'Không tìm thấy tag nào phù hợp',
		},
		newPoll: {
			title: 'Tạo một khảo sát mới',
			addOptionBtn: 'Thêm lựa chọn',
			submitBtn: 'Tạo khảo sát',
			basic: 'Thông tin cơ bản',
			advance: 'Cài đặt nâng cao',
			fieldLabels: {
				title: 'Tiêu đề',
				desc: 'Mô tả khảo sát',
				tags: `Gắn thẻ (Tối đa ${MAX.VOTE_TAG} tags)`,
				answers: `Tuỳ chọn câu trả lời (tối đa ${MAX.ANSWER_OPTIONS} tuỳ chọn)`,
				type: 'Loại khảo sát',
				isPrivate: 'Riêng tư (chỉ truy cập qua link)',
				reCaptcha: 'reCAPTCHA',
				ipCheck: 'Kiểm tra bỏ phiếu trùng lặp',
				loginRequired: 'Yêu cầu đăng nhập',
				showResult: 'Hiển thị kết quả',
				showResultBtn: 'Hiển thị nút xem kết quả',
				allowAddOption: 'Cho phép thêm lựa chọn',
				maxVote: 'Lượng bỏ phiếu tối đa',
				endDate: 'Ngày kết thúc khảo sát',
				maxScore: 'Điểm tối đa',
			},
			labelHelp: {
				isPrivate:
					'Chỉ có bạn và những người bạn chia sẻ liên kết mới có thể xem và bỏ phiếu',
				reCaptcha: 'Chỉ cho phép con người bỏ phiếu. ngăn chặn Bots !',
				ipCheck:
					'Chỉ cho phép một bỏ phiếu cho mỗi địa chỉ IP. Rất an toàn, nhưng có thể hạn chế lượt bỏ phiếu trên cùng một mạng.',
				showResult:
					'Hiển thị kết quả bỏ phiếu ngay trên các câu trả lời của bạn khi người khác truy cập',
				showResultBtn:
					'Hiển thị nút xem kết quả, nếu tuỳ chọn "Hiển thị kết quả" không được chọn. Người xem chỉ thấy kết quả khi họ nhấn vào nút xem kết quả',
				allowAddOption:
					'Cho phép người xem thêm tuỳ chọn của họ vào các tuỳ chọn của bạn',
				maxVote:
					'Số lượng phiếu bầu tối đa, sau khi đạt được con số này thì bài khảo sát sẽ được đóng lại. Mặc định không giới hạn',
				endDate:
					'Ngày kết thúc của cuộc khảo sát. Nếu không chọn, mặc định sẽ không giới hạn.',
			},
			placeholder: {
				title: 'Nhập tiêu đề khảo sát tại đây',
				desc: 'Mô tả để người khác hiểu cuộc khảo sát của bạn',
				tags: 'Nhập tag và nhấn Enter',
				answerOption: 'Tuỳ chọn',
			},
			fieldError: {
				title: `Vui lòng nhập tiêu đề, tối đa ${MAX.VOTE_TITLE} ký tự !`,
				desc: `Mô tả tối đa ${MAX.VOTE_DESC} ký tự !`,
				tags: `Vui lòng nhập ít nhất 1 tag, tối đa ${MAX.VOTE_TAG} tag !`,
				answers: `Ít nhất 2 lựa chọn (không trùng lặp và không bỏ trống), nhiều nhất ${MAX.ANSWER_OPTIONS} lựa chọn ! Mỗi lựa chọn tối đa ${MAX.OPTION_LABEL} ký tự.`,
			},
		},
		poll: {
			addOption: 'Thêm tuỳ chọn',
			showResultBtn: 'Hiển thị kết quả',
			hideResultBtn: 'Quay lại',
			submit: 'Tiến hành vote',
			comment: 'Bình luận',
			requiredLogin: 'Đăng nhập để submit',
			votingSuccess: 'Vote thành công !',
			votingFailed: 'Vote thất bại !',
		},
		faq: {
			title: 'Câu hỏi thường gặp',
		},
		accountPolls: {
			title: 'Khảo sát của tôi',
		},
	},
	pageSEO: {
		home: {
			pathname: '/',
			title: 'Trang chủ',
			desc: `${APP_NAME} - Một ứng dụng tuyệt vời cho phép bạn dễ dàng tạo các cuộc khảo sát nhanh chóng, hiệu quả nhất có thể. ${APP_NAME} cung cấp giao diện đẹp, dễ dùng và thân thiện với người dùng.`,
		},
		register: {
			pathname: '/register',
			title: 'Đăng ký',
			desc: `Chỉ với vài bước đơn giản, bạn có thể đăng ký ngay cho mình một tài khoản trong ${APP_NAME} để có thể tạo các cuộc khảo sát, giúp người khác khảo sát ngay bây giờ.`,
		},
		login: {
			pathname: '/login',
			title: 'Đăng nhập',
			desc: `Đăng nhập vào ${APP_NAME} để trải nghiệm những tính năng tuyệt vời mà ứng dụng này mang lại cho bạn. Dễ dàng đăng nhập với Google, Github`,
		},
		discovery: {
			pathname: '/discover',
			title: 'Khám phá',
			desc: `Cùng khám phá các bài khảo sát được nhiều người quan tâm trên ${APP_NAME} nhất nhé, biết đâu bạn cũng quan tâm đến nó.`,
		},
		tags: {
			pathname: '/tags',
			title: 'Tags',
			desc: `Tag là một từ khóa hoặc nhãn phân loại khảo sát của bạn với các khảo sát tương tự khác. Sử dụng các thẻ phù hợp giúp người khác dễ dàng tìm và trả lời câu hỏi của bạn hơn.`,
		},
		newPoll: {
			pathname: '/new-poll',
			title: 'Tạo khảo sát',
			desc: `Chỉ với vài bước đơn giản, bạn đã có thể tạo ngay một bài khảo sát trên ${APP_NAME}. Có rất nhiều tuỳ chỉnh cho bài khảo sát, hãy trải nghiệm ngay nhé`,
		},
		faq: {
			pathname: '/faq',
			title: 'Câu hỏi thường gặp - FAQs',
			desc: `FAQ nơi giải đáp tất cả các thắc mắc, câu hỏi thường gặp của mọi người về ứng dụng ${APP_NAME}.`,
		},
		accountPolls: {
			pathname: '/account/polls',
			title: 'Khảo sát của tôi',
			desc: `Khảo sát của tôi trên ${APP_NAME}`,
		},
	},
	others: {
		loginOAuthBreak: 'Hoặc tiếp tục với',
		poll: 'Khảo sát',
		closed: 'Đã đóng',
		loadMoreComment: 'Xem thêm bình luận',
		loading: 'Đang tải dữ liệu ...',
		scoreMaximum: 'Số điểm tối đa là ',
		sort: 'Sắp xếp',
	},
	components: {
		TagInput: {
			inputPlaceholder: 'Nhập tag & nhấn Enter',
		},
		AnswerOptions: {
			photoSize: `Kích thước tối đa của ảnh là ${MAX.OPTION_PHOTO_SIZE}MB, kích thước thích hợp là 300px x 300px`,
		},
		LinkShare: {
			title: 'Chia sẻ bài khảo sát đến bạn bè ngay nhé',
			copy: 'Sao chép',
			copied: 'Đã sao chép',
			downloadQRCode: 'Tải xuống QR Code',
			or: 'Hoặc Quét QR Code',
		},
		CreatePollSuccess: {
			title: 'Chúc mừng !',
			subTitle: 'Cuộc khảo sát đã được tạo thành công',
		},
		CommentBox: {
			charLeft: 'Ký tự còn lại',
			submitCommentBtn: 'Bình luận',
			addComment: 'Thêm bình luận của bạn',
			addCommentPlaceholder: 'Nhập bình luận của bạn tại đây',
			loginToComment: 'Đăng nhập để bình luận',
			commentSuccess: 'Bình luận thành công.',
			commentFailed: 'Bình luận thất bại.',
		},
	},
	helper: {
		pollTypes: [
			'Chọn một tuỳ chọn duy nhất.',
			'Cho phép chọn nhiều tuỳ chọn.',
			'Sắp xếp các tuỳ chọn theo cấp độ mà bạn muốn.',
			'Cho phép chấm điểm trên lựa chọn của bạn.',
		],
	},
	faqs: [
		{
			question: `${APP_NAME} là gì ?`,
			answer: `${APP_NAME} là một ứng dụng cho phép bạn dễ dàng tạo một cuộc khảo sát. Khám phá các khảo sát của mọi người, trực tiếp bỏ phiếu khảo sát yêu thích, bình luận, cho ý kiến trên khảo sát theo thời gian thực và nó hoàn toàn miễn phí.`,
		},
		{
			question: `${APP_NAME} có miễn phí không?`,
			answer: `Có, toàn bộ ưu đãi ${APP_NAME} có sẵn miễn phí. Chúng tôi tin rằng các tính năng thiết yếu của trang web không bao giờ nên bị giới hạn bởi việc giới thiệu nội dung cao cấp. Mặc dù một tùy chọn để vô hiệu hóa quảng cáo cho người tham gia bằng cách trả một khoản phí có thể có sẵn trong tương lai gần.`,
		},
		{
			question: `Có bao nhiêu người có thể tham gia bỏ phiếu`,
			answer: `Không có giới hạn số người có thể bỏ phiếu trong một khảo sát của ${APP_NAME}. Tuy nhiên, bạn có thể dễ dàng cài đặt số lượng tối đa người tham dự. Khi đạt đến con số này, khảo sát sẽ tự đóng.`,
		},
		{
			question:
				'Tôi có thể chia sẻ hình ảnh và liên kết từ một cuộc thăm dò ý kiến không?',
			answer: `Có, các cuộc thăm dò trên ${APP_NAME} được thực hiện để được chia sẻ. Nó rất hữu ích để chia sẻ không chỉ một ảnh chụp màn hình, mà còn liên kết đến nó để những người khác có thể xem kết quả trực tiếp.`,
		},
		{
			question: 'Điều gì xảy ra với dữ liệu của tôi?',
			answer:
				'Chúng tôi không thu thập nội dung của các cuộc thăm dò hoặc chuyển chúng cho bên thứ ba. Chúng tôi lưu trữ dữ liệu cá nhân một cách an toàn trong một trung tâm dữ liệu gần thành phố Hồ Chí Minh, Việt Nam.',
		},
		{
			question: `Các loại khảo sát có trên ${APP_NAME}?`,
			answer:
				'Chúng tôi cung cấp khả năng tuỳ chỉnh cuộc khảo sát của bạn rất cao với các loại khảo sát như lựa chọn đơn, lựa chọn nhiều, chấm điểm, xếp hạng, ...',
		},
	],
};
