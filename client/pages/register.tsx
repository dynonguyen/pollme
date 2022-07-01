import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { SUCCESS_CODE } from '../constants/status';
import {
	RegisterInput,
	useRegisterMutation,
} from '../graphql-client/generated/graphql';
import useCheckUserLogin from '../hooks/useCheckUserLogin';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';

const Register: NextPage = () => {
	useCheckUserLogin({ isLoginPage: true });
	const lang = useLanguage();
	const toast = useToast();
	const [registerMutation] = useRegisterMutation();
	const registerLang = lang.pages.register;
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);

	const handleFormSubmit = async (registerFields: RegisterInput) => {
		try {
			setSubmitting(true);
			const response = await registerMutation({
				variables: {
					registerInput: registerFields,
				},
			});

			if (response.data?.register.code === SUCCESS_CODE.CREATED) {
				toast.show({ message: registerLang.message.success, type: 'success' });
				router.push(lang.pages.login.link);
			} else {
				toast.show({
					message:
						response.data?.register.message || registerLang.message.failed,
					type: 'error',
				});
			}
		} catch (error) {
			toast.show({
				message: registerLang.message.failed,
				type: 'error',
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className={`my-16 flex flex-col items-center ${
				submitting ? 'disabled' : ''
			}`}
		>
			<h1 className='mb-2 text-center text-3xl font-extrabold tracking-[1px] md:text-4xl'>
				{lang.pageSEO.register.title}
			</h1>
			<p className='mb-5 text-center text-gray-400 dark:text-gray-300 md:text-lg'>
				{registerLang.subTitle}
			</p>

			<RegisterForm onSubmit={handleFormSubmit} isSubmitting={submitting} />
		</div>
	);
};

export default Register;
