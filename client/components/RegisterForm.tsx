import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { MAX, MIN } from '../constants/validation';
import { RegisterInput } from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import InputFieldRegister, {
	PasswordFieldRegister,
} from './core/InputFieldRegister';
import GoogleLogin from './GoogleLogin';

interface FieldInputs {
	email: string;
	name: string;
	password: string;
	confirmPwd?: string;
}

interface RegisterProps {
	onSubmit: (fields: RegisterInput) => void;
}

export default function RegisterForm({ onSubmit }: RegisterProps): JSX.Element {
	const lang = useLanguage();
	const registerLang = lang.pages.register;

	const schema = useMemo(
		() =>
			yup
				.object({
					email: yup
						.string()
						.required(registerLang.fields.email.errors.required)
						.email(registerLang.fields.email.errors.format)
						.max(MAX.EMAIL_LEN, registerLang.fields.email.errors.max),
					name: yup
						.string()
						.required(registerLang.fields.name.errors.required)
						.max(MAX.USERNAME_LEN, registerLang.fields.name.errors.max),
					password: yup
						.string()
						.required(registerLang.fields.password.errors.required)
						.min(MIN.PASSWORD_LEN, registerLang.fields.password.errors.min)
						.max(MAX.PASSWORD_LEN, registerLang.fields.password.errors.max),
					confirmPwd: yup
						.string()
						.oneOf(
							[yup.ref('password'), null],
							registerLang.fields.confirmPwd.errors.noMatch,
						),
				})
				.required(),
		[],
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldInputs>({ resolver: yupResolver(schema) });

	const handleFormSubmit: SubmitHandler<FieldInputs> = async fields => {
		delete fields.confirmPwd;
		const registerFields: RegisterInput = fields;
		onSubmit(registerFields);
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
				placeholder={registerLang.fields.email.placeholder}
				label={registerLang.fields.email.label}
				error={errors.email?.message}
			/>
			<InputFieldRegister
				rootClassName='mb-4'
				name='name'
				register={register}
				placeholder={registerLang.fields.name.placeholder}
				label={registerLang.fields.name.label}
				error={errors.name?.message}
			/>
			<PasswordFieldRegister
				rootClassName='mb-4'
				name='password'
				type='password'
				register={register}
				placeholder={registerLang.fields.password.placeholder}
				label={registerLang.fields.password.label}
				error={errors.password?.message}
			/>
			<PasswordFieldRegister
				rootClassName='mb-4'
				name='confirmPwd'
				register={register}
				placeholder={registerLang.fields.confirmPwd.placeholder}
				type='password'
				label={registerLang.fields.confirmPwd.label}
				error={errors.confirmPwd?.message}
			/>

			<button className='btn-primary btn-lg mt-3 w-full font-medium uppercase'>
				{registerLang.submitBtn}
			</button>

			<GoogleLogin />
		</form>
	);
}
