import { LockClosedIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Button from '../../components/core/Button';
import PasswordInput from '../../components/core/PasswordInput';
import { LS_KEY } from '../../constants/key';
import { ERROR_CODE } from '../../constants/status';
import { MAX, MIN } from '../../constants/validation';
import {
	useChangePasswordMutation,
	useLogoutMutation,
} from '../../graphql-client/generated/graphql';
import useCheckUserLogin from '../../hooks/useCheckUserLogin';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import userAtom, { userAtomDefault } from '../../recoil/atoms/user.atom';
import { isIOSMacOSDevice } from '../../utils/helper';

const ChangePassword: NextPage = () => {
	useCheckUserLogin({ isLoginPage: false });
	const lang = useLanguage();
	const changePwdLang = lang.pages.changePwd;
	const fields = useRef({ oldPwd: '', newPwd: '', confirmPwd: '' });
	const [changePwdMutation] = useChangePasswordMutation();
	const [logoutMutation] = useLogoutMutation();
	const setUserInfoAtom = useSetRecoilState(userAtom);
	const [updating, setUpdating] = useState(false);
	const toast = useToast();

	const handleChangePassword = async () => {
		const { oldPwd, newPwd, confirmPwd } = fields.current;
		if (!oldPwd || !newPwd || !confirmPwd) return;

		if (newPwd.length > MAX.PASSWORD_LEN) {
			return toast.show({
				type: 'error',
				message: lang.pages.register.fields.password.errors.max,
			});
		}
		if (newPwd.length < MIN.PASSWORD_LEN) {
			return toast.show({
				type: 'error',
				message: lang.pages.register.fields.password.errors.min,
			});
		}
		if (newPwd !== confirmPwd) {
			return toast.show({ type: 'error', message: changePwdLang.noMatch });
		}

		setUpdating(true);
		const updateRes = await changePwdMutation({
			variables: {
				changePwdInput: { newPwd, oldPwd },
			},
		});

		if (updateRes.data?.changePassword.success) {
			toast.show({ type: 'success', message: changePwdLang.changePwdSuccess });
			await logoutMutation();
			// clear access token in local storage for IOS devices
			if (isIOSMacOSDevice())
				localStorage.removeItem(LS_KEY.ACCESS_TOKEN_FOR_IOS);
			setUserInfoAtom({ ...userAtomDefault, loading: false });
		} else if (
			updateRes.data?.changePassword.code === ERROR_CODE.UNAUTHORIZED
		) {
			toast.show({ type: 'error', message: changePwdLang.incorrectPwd });
		} else {
			toast.show({ type: 'error', message: changePwdLang.changePwdFailed });
		}
		setUpdating(false);
	};

	return (
		<div className={`container ${updating ? 'disabled' : ''}`}>
			<div className='mx-auto my-8 grid max-w-md grid-cols-1 gap-3 rounded-lg py-6 px-5 shadow-lg dark:bg-d_bg_hover md:py-8 md:px-8'>
				<h1 className='flex-center mb-3 space-x-2 text-xl md:text-3xl'>
					<LockClosedIcon className='w-8' />
					<span>{changePwdLang.title}</span>
				</h1>

				<PasswordInput
					id='oldPwd'
					label={changePwdLang.oldPwd}
					onChange={v => (fields.current.oldPwd = v)}
				/>
				<PasswordInput
					id='newPwd'
					label={changePwdLang.newPwd}
					onChange={v => (fields.current.newPwd = v)}
				/>
				<PasswordInput
					id='confirmPwd'
					label={changePwdLang.confirmPwd}
					onChange={v => (fields.current.confirmPwd = v)}
				/>

				<Button
					className='font-medium'
					size='large'
					onClick={handleChangePassword}
					loading={updating}
				>
					{changePwdLang.submitBtn}
				</Button>
			</div>
		</div>
	);
};

export default ChangePassword;
