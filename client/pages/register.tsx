import { NextPage } from 'next';
import React from 'react';
import HeadTitle from '../components/HeadTitle';
import RegisterForm from '../components/RegisterForm';
import useLanguage from '../hooks/useLanguage';

const Register: NextPage = () => {
	const lang = useLanguage();
	const registerLang = lang.pages.register;
	return (
		<>
			<HeadTitle title='Register' />

			<div className='min-h-[calc(100vh-67px)] flex items-center flex-col my-16'>
				<h1 className='text-2xl md:text-4xl font-extrabold text-center tracking-[1px] mb-2'>
					{registerLang.title}
				</h1>
				<p className='text-center mb-5 text-gray-400 dark:text-gray-300 md:text-lg'>
					{registerLang.subTitle}
				</p>

				<RegisterForm />
			</div>
		</>
	);
};

export default Register;
