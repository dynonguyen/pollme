import { useRouter } from 'next/router';
import en from '../public/lang/en';
import vi from '../public/lang/vi';

export default function useLanguage() {
	const { locale } = useRouter();

	switch (locale) {
		case 'en':
			return en;
		case 'vi':
			return vi;
		default:
			return en;
	}
}
