import {
	AdjustmentsIcon,
	AnnotationIcon,
	ChatAlt2Icon,
	CheckCircleIcon,
	CursorClickIcon,
	PlusIcon,
	ShieldCheckIcon,
	UserCircleIcon,
} from '@heroicons/react/solid';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import useLanguage from '../hooks/useLanguage';
import { numberFormat } from '../utils/format';
import styles from './../styles/Home.module.css';
const featureIcons = [AdjustmentsIcon, ShieldCheckIcon, ChatAlt2Icon];

interface AnalysisProps {
	poll: number;
	user: number;
	access: number;
	comment: number;
}

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
	}, [lang]);

	return (
		<h1 className='text-4xl md:text-7xl max-w-5xl font-bold text-gradient capitalize mb-4 md:mb-6 !leading-snug'>
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

function Analysis(props: AnalysisProps): JSX.Element {
	const lang = useLanguage();
	const analyticsLang = lang.pages.home.analytics;
	const { access = 0, poll = 0, user = 0, comment = 0 } = props;
	const items: { Icon: Function; quantity: number; title: string }[] = [
		{
			Icon: CheckCircleIcon,
			quantity: poll,
			title: analyticsLang[0],
		},
		{
			Icon: UserCircleIcon,
			quantity: user,
			title: analyticsLang[1],
		},
		{
			Icon: CursorClickIcon,
			quantity: access,
			title: analyticsLang[2],
		},
		{
			Icon: AnnotationIcon,
			quantity: comment,
			title: analyticsLang[3],
		},
	];

	return (
		<div className='bg-[url("https://demo.wphash.com/nexo/wp-content/uploads/2017/06/1-2.jpg")] my-14'>
			<div className='container py-24 gap-5 grid grid-cols-2 md:grid-cols-4'>
				{items.map((item, index) => (
					<div key={index} className='flex flex-col items-center text-white'>
						<item.Icon className='w-16 h-16' />
						<div className='text-3xl md:text-4xl font-bold my-4'>
							{numberFormat(item.quantity)}
						</div>
						<h4 className='text-xl md:text-2xl text-white'>{item.title}</h4>
					</div>
				))}
			</div>
		</div>
	);
}

const Home: NextPage = () => {
	const lang = useLanguage();
	const homeLang = lang.pages.home;

	return (
		<main>
			<HeadTitle title={lang.title.home} />
			<Header />

			{/* Heading */}
			<section className='min-w-full h-[calc(100vh-67px)]	flex-center'>
				<div className='container px-3'>
					<Heading />
					<p className='text-lg md:text-xl text-text_title dark:text-d_text_title !leading-loose'>
						<strong>{homeLang.subTitles[0]}</strong>
						{homeLang.subTitles[1]} <br />
						{homeLang.subTitles[2]}
					</p>
					<Link href='/new-vote'>
						<button className='btn-primary py-2 md:btn-lg flex items-center mt-5 md:mt-10 font-medium'>
							<PlusIcon className='w-5 mr-2' />
							<span className='capitalize'>{homeLang.buttons.createPoll}</span>
						</button>
					</Link>
				</div>
			</section>

			{/* Introduction */}
			<section className='container'>
				<div className='grid gap-4 grid-cols-1 md:grid-cols-2 items-center mb-28'>
					<div className='col-span-1'>
						<h2 className='text-2xl md:text-3xl capitalize max-w-xl text-text_title dark:text-d_text_title font-medium'>
							{homeLang.introduction[0].title}
						</h2>
						<p className='text-base md:text-lg font-light tracking-wider mt-5 max-w-xl'>
							{homeLang.introduction[0].content}
						</p>
					</div>
					<div className='col-span-1 row-start-1 mb-4 md:mb-0 md:col-start-2'>
						<img
							src='/images/home-page/intro-1.svg'
							alt='Landing Page 1'
							className='max-w-96 mx-auto'
						/>
					</div>
				</div>

				<div className='grid gap-6 grid-cols-1 md:grid-cols-2 items-center mb-28'>
					<div className='col-span-1'>
						<img
							src='/images/home-page/intro-2.png'
							alt='Landing Page 1'
							className='max-w-96 max-h-80 mx-auto mb-4 md:mb-0'
						/>
					</div>
					<div className='col-span-1'>
						<h2 className='text-2xl md:text-3xl capitalize max-w-xl text-text_title dark:text-d_text_title font-medium'>
							{homeLang.introduction[1].title}
						</h2>
						<p className='text-base md:text-lg font-light tracking-wider mt-5 max-w-xl'>
							{homeLang.introduction[1].content}
						</p>
					</div>
				</div>

				<div className='grid gap-4 grid-cols-1 md:grid-cols-2 items-center'>
					<div className='col-span-1'>
						<h2 className='text-2xl md:text-3xl capitalize max-w-xl text-text_title dark:text-d_text_title font-medium'>
							{homeLang.introduction[2].title}
						</h2>
						<p className='text-base md:text-lg font-light tracking-wider mt-5 max-w-xl'>
							{homeLang.introduction[2].content}
						</p>
					</div>
					<div className='col-span-1 row-start-1 mb-4 md:mb-0 md:col-start-2'>
						<img
							src='/images/home-page/intro-3.png'
							alt='Landing Page 1'
							className='max-w-96 max-h-80 mx-auto'
						/>
					</div>
				</div>
			</section>

			{/* Analytics */}
			<Analysis poll={0} access={0} comment={0} user={0} />

			{/* Best features */}
			<section className='mb-12'>
				<h2 className='text-center text-3xl md:text-4xl mb-12 capitalize'>
					{homeLang.featureTitle}
				</h2>
				<div className='container flex justify-center gap-7 flex-wrap'>
					{homeLang.features.map((f, index) => {
						const Icon = featureIcons[index];
						return (
							<div
								key={index}
								className='flex flex-col items-center p-8 shadow-lg md:shadow-xl rounded-xl max-w-sm'
							>
								<Icon className='w-16 h-16 mb-6 text-color-title' />
								<h5 className='text-xl md:text-2xl mb-3 text-center capitalize'>
									{f.title}
								</h5>
								<p className='text-sm md:text-lg font-light text-center'>
									{f.content}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			<Footer />
		</main>
	);
};

export default Home;
