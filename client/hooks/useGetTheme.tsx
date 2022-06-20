import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LS_KEY } from '../constants/key';
import themeAtom from '../recoil/atoms/theme.atom';

export default function useGetTheme(): boolean {
	const setTheme = useSetRecoilState(themeAtom);
	const [loading, setLoading] = useState(true);

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

		setLoading(false);
	}, []);

	return loading;
}
