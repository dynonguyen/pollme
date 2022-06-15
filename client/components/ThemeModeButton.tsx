import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { LS_KEY } from '../constants/key';
import themeAtom from '../recoil/atoms/theme.atom';

export default function ThemeModeButton(): JSX.Element {
	const [theme, setTheme] = useRecoilState(themeAtom);
	const { isDark } = theme;
	const Icon = isDark ? MoonIcon : SunIcon;

	const toggleTheme = () => {
		const htmlClassList = document.documentElement.classList;

		if (isDark) {
			htmlClassList.remove('dark');
			localStorage.removeItem(LS_KEY.THEME);
			setTheme({ isDark: false });
		} else {
			htmlClassList.add('dark');
			localStorage.setItem(LS_KEY.THEME, 'dark');
			setTheme({ isDark: true });
		}
	};

	return (
		<Icon
			className='w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-d_text_title dark:hover:text-gray-400 cursor-pointer'
			onClick={toggleTheme}
		/>
	);
}
