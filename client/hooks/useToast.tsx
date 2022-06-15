import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import themeAtom from '../recoil/atoms/theme.atom';

interface ToastResult {
	show: (options: ToastOptions & { message: string }) => void;
}

const TIME_OUT = 5000; // 5s

export default function useToast(): ToastResult {
	const { isDark } = useRecoilValue(themeAtom);
	const theme = isDark ? 'dark' : 'light';

	const toastOptions: ToastOptions = {
		position: 'bottom-right',
		autoClose: TIME_OUT,
		closeOnClick: true,
		draggable: false,
		pauseOnHover: true,
	};

	return {
		show: function ({ message, type = 'default', ...options }) {
			toast(message, { ...toastOptions, type, ...options, theme });
		},
	};
}
