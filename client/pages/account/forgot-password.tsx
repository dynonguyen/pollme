import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import PasswordInput from '../../components/core/PasswordInput';
import { ERROR_CODE } from '../../constants/status';
import { MAX, MIN, VERIFY_CODE_LEN } from '../../constants/validation';
import {
	useChangePwdByVerifyCodeMutation,
	useForgotPwdSendMailMutation,
} from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import { isEmail } from '../../utils/validation';

const ForgotPassword: NextPage = () => {
	const lang = useLanguage();
	const changePwdLang = lang.pages.changePwd;
	const forgotPwdLang = lang.pages.forgotPwd;
	const fields = useRef({
		newPwd: '',
		confirmPwd: '',
		email: '',
		verifyCode: '',
	});
	const [updating, setUpdating] = useState(false);
	const [isSentMail, setIsSentMail] = useState(0);
	const toast = useToast();
	const [sendCodeMutation] = useForgotPwdSendMailMutation();
	const [changePwdMutation] = useChangePwdByVerifyCodeMutation();
	const router = useRouter();

	const handleChangePassword = async () => {
		const { newPwd, confirmPwd, email, verifyCode } = fields.current;
		if (!newPwd || !confirmPwd || !email || !verifyCode) return;

		if (verifyCode.length !== VERIFY_CODE_LEN) {
			return toast.show({
				type: 'error',
				message: forgotPwdLang.messageVerifyCode,
			});
		}
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
				changePwdInput: { email, password: newPwd, verifyCode },
			},
		});
		if (updateRes.data?.changePwdByVerifyCode.success) {
			toast.show({ type: 'success', message: changePwdLang.changePwdSuccess });
			router.push(lang.pageSEO.login.pathname);
			return;
		} else if (
			updateRes.data?.changePwdByVerifyCode.code === ERROR_CODE.UNAUTHORIZED
		) {
			toast.show({ type: 'error', message: forgotPwdLang.invalidCode });
		} else {
			toast.show({ type: 'error', message: changePwdLang.changePwdFailed });
		}

		setUpdating(false);
	};

	const handleSendVerifyCode = async () => {
		if (isSentMail > 0) return;

		const { email } = fields.current;
		if (!email || !isEmail(email)) {
			return toast.show({ type: 'error', message: forgotPwdLang.invalidEmail });
		}

		setIsSentMail(-1);
		const sendMailRes = await sendCodeMutation({
			variables: { sendMailInput: { email, lang: router.locale } },
		});

		if (sendMailRes.data?.forgotPwdSendMail.success) {
			toast.show({ type: 'success', message: forgotPwdLang.sendCodeSuccess });
			setIsSentMail(1);
		} else if (
			sendMailRes.data?.forgotPwdSendMail.code === ERROR_CODE.NOT_FOUND
		) {
			toast.show({ type: 'error', message: lang.messages.accountNotExist });
			setIsSentMail(0);
		} else {
			toast.show({ type: 'error', message: forgotPwdLang.sendCodeFailed });
			setIsSentMail(0);
		}
	};

	return (
		<div className={`container ${updating ? 'disabled' : ''}`}>
			<div className='mx-auto my-8 grid max-w-md grid-cols-1 gap-3 rounded-lg py-6 px-5 shadow-lg dark:bg-d_bg_hover md:py-8 md:px-8'>
				<h1 className='flex-center mb-3 space-x-2 text-xl md:text-3xl'>
					<LockClosedIcon className='w-8' />
					<span>{forgotPwdLang.title}</span>
				</h1>

				<input
					className={`field ${isSentMail ? 'disabled' : ''}`}
					placeholder='Email'
					onChange={e => (fields.current.email = e.target.value.trim())}
					autoFocus
				/>
				<div className='flex space-x-1'>
					<input
						className='field'
						placeholder={forgotPwdLang.verifyCode}
						onChange={e => (fields.current.verifyCode = e.target.value.trim())}
					/>
					<button
						className={`btn-accent min-w-max ${isSentMail ? 'disabled' : ''}`}
						onClick={handleSendVerifyCode}
					>
						{isSentMail === 1 ? (
							<div className='flex'>
								<span>{forgotPwdLang.sentCode}</span>
								<CheckCircleIcon className='ml-1 w-5' />
							</div>
						) : (
							forgotPwdLang.getVerifyCode
						)}
					</button>
				</div>

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

				<button
					className='btn-primary btn-lg font-medium'
					onClick={handleChangePassword}
				>
					{changePwdLang.submitBtn}
				</button>
			</div>
		</div>
	);
};

export default ForgotPassword;
