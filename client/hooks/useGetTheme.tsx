import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { LS_KEY } from '../constants/key';
import themeAtom from '../recoil/atoms/theme.atom';

export default function useGetTheme() {
	const setTheme = useSetRecoilState(themeAtom);

	useEffect(() => {
		const mode = localStorage.getItem(LS_KEY.THEME);
		if (mode && mode === 'dark') {
			setTheme({ isDark: true });
		} else {
			setTheme({ isDark: false });
		}
	}, []);
}
