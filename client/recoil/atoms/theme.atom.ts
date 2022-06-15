import { atom } from 'recoil';

interface ThemeAtom {
	isDark: boolean;
}

const themeAtom = atom<ThemeAtom>({
	key: 'theme',
	default: { isDark: false },
});

export default themeAtom;
