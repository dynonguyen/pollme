import { MAX, MIN } from '../../constants/validation';
import { APP_NAME } from './../../constants/index';

export default {
	title: {
		home: 'Trang chủ',
		notfound: 'Không tìm thấy trang',
	},
	navbarItems: [
		{
			link: '/discover',
			label: 'Khám phá',
		},
		{
			link: '/new-vote',
			label: 'Tạo khảo sát',
		},
		{
			link: '/about-me',
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
	},
	placeholder: {
		defaultSelect: 'Chọn một lựa chọn',
		search: 'Tìm kiếm',
	},
	pages: {
		notfound: {
			title: 'Xin lỗi trang không thể tìm thấy hoặc đang bị hỏng.',
			subTitle:
				'Đừng lo lắng, chúng tôi sẽ sửa chữa sớm nhất có thể, hãy về trang chủ nhé.',
			backHomeBtn: 'Quay về trang chủ',
		},
		home: {
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
			title: 'Đăng ký',
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
		},
	},
};
