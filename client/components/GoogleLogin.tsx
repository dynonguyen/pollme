import { useRouter } from 'next/router';
import GoogleLoginButton, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from 'react-google-login';
import { useRecoilState } from 'recoil';
import { GOOGLE_API_ID } from '../constants/key';
import { SUCCESS_CODE } from '../constants/status';
import {
	useLoginOAuthMutation,
	UserInfoFragment,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import userAtom from '../recoil/atoms/user.atom';

export default function GoogleLogin(): JSX.Element {
	const toast = useToast();
	const lang = useLanguage();
	const loginLang = lang.pages.login;
	const router = useRouter();
	const [oauthLoginMutation] = useLoginOAuthMutation();
	const [userInfo, setUserInfoAtom] = useRecoilState(userAtom);

	const handleLoginFailure = (message: string) => {
		toast.show({ type: 'error', message: message });
	};

	const onLoginSuccess = async (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		const { profileObj } = response as GoogleLoginResponse;
		const { email, name, imageUrl, googleId } = profileObj;
		try {
			const response = await oauthLoginMutation({
				variables: {
					loginInput: { email, name, avt: imageUrl, oauthId: googleId },
				},
			});
			if (response.data?.loginWithOAuth.code === SUCCESS_CODE.OK) {
				const user = response.data.loginWithOAuth.user as UserInfoFragment;
				const { __typename, avt, ...rest } = user;
				setUserInfoAtom({
					...userInfo,
					...rest,
					createdAt: new Date(),
					avt: avt as string,
				});
				toast.show({
					type: 'success',
					message: loginLang.message.success(user.name),
				});
				router.push('/');
			} else {
				handleLoginFailure(
					response.data?.loginWithOAuth.message || loginLang.message.failed,
				);
			}
		} catch (error) {
			handleLoginFailure(loginLang.message.failed);
		}
	};

	return (
		<>
			<div className='my-6'>
				<div className='relative h-[1px] bg-gray-300 dark:bg-gray-700'>
					<span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-400 dark:bg-d_bg md:text-base'>
						{lang.others.loginOAuthBreak}
					</span>
				</div>
			</div>
			<GoogleLoginButton
				clientId={GOOGLE_API_ID}
				render={renderProps => (
					<button
						type='button'
						className='btn-outline btn-lg w-full'
						onClick={renderProps.onClick}
					>
						Google
					</button>
				)}
				buttonText='Login'
				onSuccess={onLoginSuccess}
				cookiePolicy={'single_host_origin'}
			/>
		</>
	);
}
