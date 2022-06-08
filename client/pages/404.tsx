import Link from 'next/link';
import React from 'react';
import useLanguage from '../hooks/useLanguage';

export default function NotFoundPage() {
	const lang = useLanguage();
	const { title, subTitle, backHomeBtn } = lang.pages.notfound;

	return (
		<div className='h-screen w-screen bg-gray-100 flex items-center dark:bg-d_bg'>
			<div className='container mx-auto flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
				<div className='max-w-md'>
					<div className='text-6xl font-dark dark:text-d_text_title font-bold'>
						404
					</div>
					<p className='text-2xl md:text-3xl dark:text-d_text_title font-light leading-normal'>
						{title}
					</p>
					<p className='mb-8 dark:text-d_text_primary mt-2'>{subTitle}</p>
					<Link href='/'>
						<a>
							<button className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue btn-primary uppercase'>
								{backHomeBtn}
							</button>
						</a>
					</Link>
				</div>
				<div className='max-w-lg'>
					<img src='/images/404.svg' alt='Logo' />
				</div>
			</div>
		</div>
	);
}
