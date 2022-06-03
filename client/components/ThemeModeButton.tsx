import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { LS_KEY } from '../constants/key';

export default function ThemeModeButton(): JSX.Element {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const mode = localStorage.getItem(LS_KEY.THEME);
		if (mode && mode === 'dark') {
			setIsDark(true);
		}
	}, []);

	useEffect(() => {
		const htmlClassList = document.documentElement.classList;
		if (!isDark) {
			htmlClassList.remove('dark');
			localStorage.removeItem(LS_KEY.THEME);
		} else {
			htmlClassList.add('dark');
			localStorage.setItem(LS_KEY.THEME, 'dark');
		}
	}, [isDark]);

	const Icon = isDark ? MoonIcon : SunIcon;

	return (
		<Icon
			className='w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-d_text_title dark:hover:text-gray-400 cursor-pointer'
			onClick={() => setIsDark(!isDark)}
		/>
	);
}
