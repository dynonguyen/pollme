import { PlusIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRecoilValue } from 'recoil';
import Pagination from '../../components/core/Pagination';
import PollOptionCheckbox from '../../components/PollOptionCheckbox';
import SocialShare from '../../components/SocialShare';
import { APP_NAME } from '../../constants';
import { DEFAULT } from '../../constants/default';
import themeAtom from '../../recoil/atoms/theme.atom';
import { dateFormat } from '../../utils/format';

const userAvt = DEFAULT.USER_AVT;
const createdAt = new Date('2000-05-20');
const classes = {
	smGray: 'text-gray-500 dark:text-gray-400 text-sm',
};

const Poll: NextPage = () => {
	const { isDark } = useRecoilValue(themeAtom);
	useEffect(() => {
		document.getElementById('rc-anchor-alert')?.remove();
	}, []);

	return (
		<>
			<Head>
				<title>
					Top 5 high priority Error logs from Cloudwatch insights? | {APP_NAME}
				</title>
				<meta
					name='description'
					content='Top 5 high priority Error logs from Cloudwatch insights - I want to write a cloud watch query to get top 5 Maximum time repeatedly occuring Error Messeges and count of these Errors ?'
				/>
			</Head>

			<div className='max-w-4xl px-3 md:px-6 mx-auto my-3 md:my-5'>
				<h1 className='text-2xl md:text-3xl md:mb-2 font-normal'>
					Top 5 high priority Error logs from Cloudwatch insights?
				</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-3 border-b border-color'>
					<div className='flex items-center gap-2 md:gap-2'>
						<img
							src={userAvt}
							width={24}
							height={24}
							className='rounded-full'
						/>
						<span className={classes.smGray}>Dyno Nguyễn</span>
						<span
							className={classes.smGray}
							title={dateFormat(createdAt, true)}
						>
							{dateFormat(createdAt, false)}
						</span>
						<span className={classes.smGray}>
							<b>100</b> voted
						</span>
					</div>
					<SocialShare className='md:justify-end' />
				</div>

				{/* description */}
				<p className='md:text-lg text-gray-600 dark:text-d_text_primary mt-3'>
					I want to write a cloud watch query to get top 5 Maximum time
					repeatedly occuring Error Messeges and count of these Errors ?
				</p>

				{/* poll options */}
				<ul className='mt-5 mb-4 grid grid-cols-1 gap-3 md:gap-6'>
					<li>
						<PollOptionCheckbox title='JavaScript' percent={20} rank={1} />
					</li>
					<li>
						<PollOptionCheckbox title='C++' percent={30} rank={2} />
					</li>
					<li>
						<PollOptionCheckbox title='Java' percent={50} rank={3} />
					</li>

					{/* add option */}
					<button className='btn flex items-center gap-2 hover:opacity-70 duration-300'>
						<PlusIcon className='w-5' />
						<span>Add Option</span>
					</button>
				</ul>

				{/* ReCAPTCHA */}
				<div className='flex justify-end mb-5'>
					<ReCAPTCHA
						sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
						theme={isDark ? 'dark' : 'light'}
						onChange={value => {
							console.log(value);
						}}
					/>
				</div>

				{/* button group */}
				<div className='flex justify-end gap-3 pt-3'>
					<button className='btn-outline md:btn-lg rounded-full font-medium'>
						Show Result
					</button>
					<button className='btn-accent md:btn-lg rounded-full font-medium'>
						Submit vote
					</button>
				</div>

				{/* Comment list */}
				<div className='h-[1px] bg-gray-200 dark:bg-gray-600 my-4 md:my-6'></div>
				<h2 className='text-xl md:text-2xl font-normal'>50 Comments</h2>
				<ul className='grid grid-cols-1 gap-5 md:gap-6 py-4'>
					<li className='flex gap-3 shadow-md px-2 py-4 rounded-lg dark:shadow-none dark:bg-d_bg_hover'>
						<img
							className='w-10 h-10 flex-shrink-0'
							src='/images/default-avt/0.png'
							alt=''
						/>
						<div>
							<div className='flex flex-wrap items-center gap-1 md:gap-3'>
								<strong>Dyno Nguyễn</strong>
								<span className='text-gray-400 dark:text-gray-600 text-sm'>
									07:10 20-01-2020
								</span>
							</div>
							<p className='text-gray-600 dark:text-d_text_primary py-2'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Expedita eligendi optio dicta numquam. Neque at repellendus
								incidunt explicabo est distinctio!
							</p>
							<div className='flex gap-2 items-center text-gray-400 dark:text-gray-600'>
								<HeartIcon className='h-7 cursor-pointer hover:opacity-70 duration-300' />
								<span>150</span>
							</div>
						</div>
					</li>
					<li className='flex gap-3 shadow-md px-2 py-4 rounded-lg dark:shadow-none dark:bg-d_bg_hover'>
						<img
							className='w-10 h-10 flex-shrink-0'
							src='/images/default-avt/0.png'
							alt=''
						/>
						<div>
							<div className='flex flex-wrap items-center gap-1 md:gap-3'>
								<strong>Dyno Nguyễn</strong>
								<span className='text-gray-400 dark:text-gray-600 text-sm'>
									07:10 20-01-2020
								</span>
							</div>
							<p className='text-gray-600 dark:text-d_text_primary py-2'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Expedita eligendi optio dicta numquam. Neque at repellendus
								incidunt explicabo est distinctio!
							</p>
							<div className='flex gap-2 items-center text-gray-400 dark:text-gray-600'>
								<HeartIcon className='h-7 cursor-pointer hover:opacity-70 duration-300' />
								<span>150</span>
							</div>
						</div>
					</li>
				</ul>
				<Pagination pageCount={2} className='w-full !my-5 !justify-end' />

				{/* Comment box */}
				<div className='shadow-md dark:shadow-none dark:border dark:border-gray-600 py-3 md:py-4 px-4 md:px-6 rounded-lg mt-5'>
					<h3 className='text-xl mb-2 text-primary dark:text-d_primary'>
						Add your comment
					</h3>
					<textarea
						className='field min-h-[60px]'
						rows={4}
						placeholder='Enter your comment here'
					></textarea>
					<p className='text-right text-sm text-gray-500'>4 characters left</p>
					<div className='text-right mt-2'>
						<button className='btn btn-primary md:btn-lg capitalize'>
							Submit comment
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Poll;
