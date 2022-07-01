import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import LoginForm from '../components/LoginForm';
import { LS_KEY } from '../constants/key';
import { SUCCESS_CODE } from '../constants/status';
import {
	LoginInput,
	useLoginMutation,
	UserInfoFragment,
} from '../graphql-client/generated/graphql';
import useCheckUserLogin from '../hooks/useCheckUserLogin';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import userAtom from '../recoil/atoms/user.atom';
import { isIOSMacOSDevice } from '../utils/helper';

const Login: NextPage = () => {
	useCheckUserLogin({ isLoginPage: true });
	const lang = useLanguage();
	const toast = useToast();
	const loginLang = lang.pages.login;
	const router = useRouter();
	const [loginMutation] = useLoginMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [userInfo, setUserInfoAtom] = useRecoilState(userAtom);

	const handleFormSubmit = async (loginInput: LoginInput) => {
		try {
			setIsSubmitting(true);
			const response = await loginMutation({ variables: { loginInput } });
			if (response.data?.login.code === SUCCESS_CODE.OK) {
				const user = response.data.login.user as UserInfoFragment;
				const { accessToken } = response.data.login;
				const { __typename, avt, createdAt, ...rest } = user;

				// Push access token into local storage for IOS devices
				if (accessToken && isIOSMacOSDevice()) {
					localStorage.setItem(LS_KEY.ACCESS_TOKEN_FOR_IOS, accessToken);
				}
				setUserInfoAtom({
					...userInfo,
					...rest,
					avt: avt as string,
					createdAt: new Date(createdAt),
				});

				toast.show({
					type: 'success',
					message: loginLang.message.success(user.name),
				});

				if (window.history.length > 1) router.back();
				else router.push('/');
			} else {
				toast.show({
					type: 'error',
					message: response.data?.login.message || loginLang.message.failed,
				});
			}
		} catch (error) {
			toast.show({
				type: 'error',
				message: loginLang.message.failed,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='my-16 flex flex-col items-center'>
			<h1 className='mb-6 text-center text-3xl font-extrabold tracking-[1px] md:text-4xl'>
				{lang.pageSEO.login.title}
			</h1>
			<LoginForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
		</div>
	);
};

export default Login;
