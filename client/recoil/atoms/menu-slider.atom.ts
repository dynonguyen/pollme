import { atom } from 'recoil';

export const MenuSliderAtom = atom<boolean>({
	key: 'menu-slider',
	default: false,
});
