import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { LS_KEY } from '../constants/key';
import themeAtom from '../recoil/atoms/theme.atom';

export default function useGetTheme() {
	const setTheme = useSetRecoilState(themeAtom);

	useEffect(() => {
		const mode = localStorage.getItem(LS_KEY.THEME);
		const htmlClassList = document.documentElement.classList;

		if (mode && mode === 'dark') {
			htmlClassList.add('dark');
			setTheme({ isDark: true });
		} else {
			htmlClassList.remove('dark');
			setTheme({ isDark: false });
		}
	}, []);
}
