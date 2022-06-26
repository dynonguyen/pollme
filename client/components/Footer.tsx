import Image from 'next/image';
import { APP_NAME } from '../constants';

interface Contact {
	link: string;
	iconSrc: string;
}

const contacts: Contact[] = [
	{
		link: 'https://fb.com/TuanNguyen250400',
		iconSrc: '/icons/facebook.svg',
	},
	{
		link: 'https://www.linkedin.com/in/nlatuan/',
		iconSrc: '/icons/linkedin.svg',
	},
	{
		link: 'https://twitter.com/TunNguy73522840',
		iconSrc: '/icons/twitter.svg',
	},
	{
		link: 'https://github.com/TuanNguyen2504',
		iconSrc: '/icons/github.svg',
	},
	{
		link: 'https://dynonguyen.com',
		iconSrc: '/icons/blog.svg',
	},
];

export default function Footer(): JSX.Element {
	return (
		<footer className='bg-d_bg py-4 dark:border-t dark:border-gray-600'>
			<div className='container'>
				<div className='text-center'>
					<strong className='text-xl uppercase tracking-[1px] text-slate-300 md:text-3xl'>
						{APP_NAME}
					</strong>
				</div>
				<ul className='mt-3 mb-6 flex justify-center space-x-3 md:space-x-6'>
					{contacts.map((contact, index) => (
						<li key={index} className='cursor-pointer rounded-full border p-2'>
							<a href={contact.link} target='_blank'>
								<div className='relative h-3 w-3 md:h-5 md:w-5'>
									<Image
										src={contact.iconSrc}
										layout='fill'
										objectFit='contain'
									/>
								</div>
							</a>
						</li>
					))}
				</ul>
				<p className='text-center text-sm text-slate-300 md:text-lg'>
					Copyright© {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
}
