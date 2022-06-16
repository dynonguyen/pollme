import GoogleReCaptcha from 'react-google-recaptcha';
import { useRecoilValue } from 'recoil';
import { GOOGLE_RECAPTCHA_SITE_KEY } from '../constants/key';
import themeAtom from '../recoil/atoms/theme.atom';

interface ReCAPTCHAProps {
	onChange?: (token: string | null) => void;
}

export default function ReCAPTCHA({ onChange }: ReCAPTCHAProps) {
	const { isDark } = useRecoilValue(themeAtom);

	return (
		<GoogleReCaptcha
			sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
			theme={isDark ? 'dark' : 'light'}
			onChange={onChange}
		/>
	);
}
