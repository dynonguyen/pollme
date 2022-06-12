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
			link: '/lien-he',
			label: 'Liên hệ',
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
	},
	placeholder: {
		defaultSelect: 'Chọn một lựa chọn',
		search: 'Tìm kiếm',
	},
	accountMenu: [
		{
			to: '/khao-sat-cua-toi',
			title: 'Khảo sát của tôi',
		},
		{
			to: '/cai-dat-tai-khoan',
			title: 'Cài đặt tài khoản',
		},
	],
	messages: {
		logoutSuccess: 'Đăng xuất thành công',
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
				{ title: 'Mới nhất', key: 'createdAt' },
				{ title: 'Cũ nhất', key: '-createdAt' },
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
		newVote: {
			pathname: '/new-poll',
			title: 'Tạo khảo sát',
			desc: `Chỉ với vài bước đơn giản, bạn đã có thể tạo ngay một bài khảo sát trên ${APP_NAME}. Có rất nhiều tuỳ chỉnh cho bài khảo sát, hãy trải nghiệm ngay nhé`,
		},
	},
	others: {
		loginOAuthBreak: 'Hoặc tiếp tục với',
		poll: 'Khảo sát',
		closed: 'Đã đóng',
	},
};
