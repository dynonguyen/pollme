import { useRouter } from 'next/router';
import { SelectOptions } from '../types/common';
import Select from './core/Select';

const languageOptions: SelectOptions[] = [
	{
		label: 'Vi',
		value: 'vi',
	},
	{
		label: 'En',
		value: 'en',
	},
];

export default function LanguageSelect(): JSX.Element {
	const router = useRouter();
	const { locale } = useRouter();
	const { pathname } = router;

	const handleChangeLanguage = (lang: string | number) => {
		router.push(pathname, pathname, {
			locale: lang as string,
		});
	};

	return (
		<Select
			options={languageOptions}
			className='px-2 py-1 !w-14'
			defaultValue={locale}
			onChange={handleChangeLanguage}
		/>
	);
}
