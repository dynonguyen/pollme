import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { MAX, MIN } from '../constants/validation';
import { LoginInput } from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import InputFieldRegister, {
	PasswordFieldRegister,
} from './core/InputFieldRegister';
import GoogleLogin from './GoogleLogin';

interface RegisterProps {
	onSubmit: (fields: LoginInput) => void;
}

export default function LoginForm({ onSubmit }: RegisterProps): JSX.Element {
	const lang = useLanguage();
	const loginLang = lang.pages.login;

	const schema = useMemo(
		() =>
			yup
				.object({
					email: yup
						.string()
						.required(loginLang.fields.email.errors.required)
						.email(loginLang.fields.email.errors.format)
						.max(MAX.EMAIL_LEN, loginLang.fields.email.errors.max),
					password: yup
						.string()
						.required(loginLang.fields.password.errors.required)
						.min(MIN.PASSWORD_LEN, loginLang.fields.password.errors.min)
						.max(MAX.PASSWORD_LEN, loginLang.fields.password.errors.max),
				})
				.required(),
		[],
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({ resolver: yupResolver(schema) });

	const handleFormSubmit: SubmitHandler<LoginInput> = async fields => {
		onSubmit(fields);
	};

	return (
		<form
			className='w-11/12 rounded-lg px-6 py-5 shadow-md dark:border dark:border-gray-600 dark:shadow-none sm:w-[420px]'
			onSubmit={handleSubmit(handleFormSubmit)}
		>
			<InputFieldRegister
				rootClassName='mb-4'
				name='email'
				register={register}
				placeholder='dynonguyen@example.com'
				label={loginLang.fields.email.label}
				error={errors.email?.message}
			/>

			<PasswordFieldRegister
				rootClassName='mb-4'
				name='password'
				type='password'
				register={register}
				placeholder='********'
				label={loginLang.fields.password.label}
				error={errors.password?.message}
			/>

			<Link href={lang.pageSEO.forgotPwd.pathname}>
				<a className='font-medium text-accent dark:text-d_accent'>
					{lang.pageSEO.forgotPwd.title} ?
				</a>
			</Link>

			<button className='btn-primary btn-lg mt-3 w-full font-medium uppercase'>
				{loginLang.submitBtn}
			</button>

			<GoogleLogin />
		</form>
	);
}
