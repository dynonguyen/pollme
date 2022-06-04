import { PlusIcon } from '@heroicons/react/solid';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import useLanguage from '../hooks/useLanguage';
import styles from './../styles/Home.module.css';

function Heading(): JSX.Element {
	const lang = useLanguage();
	const homeLang = lang.pages.home;
	const { titleRoles } = homeLang;
	const [roleTitle, setRoleTitle] = useState(titleRoles[0]);
	const [aniClass, setAniClass] = useState(styles.aniSlideIn);
	const roleIndex = useRef(0);
	const REPLAY_TIME = 4000;

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (roleIndex.current >= titleRoles.length - 1) {
				setRoleTitle(titleRoles[0]);
				roleIndex.current = 0;
			} else {
				setRoleTitle(titleRoles[roleIndex.current + 1]);
				roleIndex.current++;
			}
			setAniClass(styles.aniSlideIn);
		}, REPLAY_TIME);

		const intervalId2 = setInterval(() => {
			setAniClass('');
		}, REPLAY_TIME / 1.5);
		return () => {
			clearInterval(intervalId);
			clearInterval(intervalId2);
		};
	}, []);

	return (
		<h1 className='text-4xl md:text-7xl font-bold text-gradient capitalize mb-4 md:mb-8 !leading-snug'>
			{homeLang.titles[0]}&nbsp;
			<span
				className={`text-accent dark:text-d_accent inline-block ${aniClass}`}
			>
				{roleTitle}&nbsp;
			</span>
			{homeLang.titles[1]}
		</h1>
	);
}

const Home: NextPage = () => {
	const lang = useLanguage();
	const homeLang = lang.pages.home;

	return (
		<>
			<HeadTitle title={lang.title.home} />
			<Header />

			<div className='min-w-full h-[calc(100vh-67px)]	flex-center'>
				<div className='max-w-4xl m-auto px-3'>
					<Heading />
					<p className='text-lg md:text-xl text-text_title dark:text-d_text_title !leading-loose'>
						<strong>{homeLang.subTitles[0]}</strong>
						{homeLang.subTitles[1]} <br />
						{homeLang.subTitles[2]}
					</p>
					<Link href='/new-vote'>
						<button className='btn-primary py-2 md:btn-lg flex items-center mt-6 md:mt-10 font-medium'>
							<PlusIcon className='w-5 mr-2' />
							<span className='capitalize'>{homeLang.buttons.createPoll}</span>
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Home;
