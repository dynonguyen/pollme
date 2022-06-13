import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../recoil/atoms/user.atom';
import useLanguage from './useLanguage';

export default function useCheckUserLogin({
	isLoginPage = false,
}: {
	isLoginPage: boolean;
}) {
	const userInfo = useRecoilValue(userAtom);
	const router = useRouter();
	const lang = useLanguage();

	useEffect(() => {
		if (!isLoginPage && !userInfo.loading && !userInfo._id) {
			router.push(lang.pages.login.link);
		} else if (isLoginPage && !userInfo.loading && userInfo._id) {
			router.push('/');
		}
	}, [userInfo]);
}
