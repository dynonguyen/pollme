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
				'nhà phân tích dữ liệu',
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
		},
	},
};
