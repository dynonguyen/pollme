import {
	AdjustmentsIcon,
	AnnotationIcon,
	ChatAlt2Icon,
	CheckCircleIcon,
	PlusIcon,
	ShieldCheckIcon,
	TagIcon,
	UserCircleIcon,
} from '@heroicons/react/solid';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { STATIC_PROPS_REVALIDATE } from '../constants';
import {
	HomeAnalysisDocument,
	HomeAnalysisQuery,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { numberFormat } from '../utils/format';
import styles from './../styles/Home.module.css';
const featureIcons = [AdjustmentsIcon, ShieldCheckIcon, ChatAlt2Icon];

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
		<h1 className='text-gradient mb-4 max-w-5xl text-4xl font-bold capitalize !leading-snug md:mb-6 md:text-7xl'>
			{homeLang.titles[0]}&nbsp;
			<span
				className={`inline-block text-accent dark:text-d_accent ${aniClass}`}
			>
				{roleTitle}&nbsp;
			</span>
			{homeLang.titles[1]}
		</h1>
	);
}

function Analysis(props: HomeAnalysisQuery): JSX.Element {
	const lang = useLanguage();
	const analyticsLang = lang.pages.home.analytics;
	const { count } = props;
	const { comment, tag, poll, user } = count;

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
			Icon: TagIcon,
			quantity: tag,
			title: analyticsLang[2],
		},
		{
			Icon: AnnotationIcon,
			quantity: comment,
			title: analyticsLang[3],
		},
	];

	return (
		<div className='my-14 bg-[url("/images/home-page/bg.jpg")]'>
			<div className='container grid grid-cols-2 gap-5 py-24 md:grid-cols-4'>
				{items.map((item, index) => (
					<div key={index} className='flex flex-col items-center text-white'>
						<item.Icon className='h-16 w-16' />
						<div className='my-4 text-3xl font-bold md:text-4xl'>
							{numberFormat(item.quantity)}
						</div>
						<h4 className='text-xl text-white md:text-2xl'>{item.title}</h4>
					</div>
				))}
			</div>
		</div>
	);
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	homeAnalysis,
}) => {
	const lang = useLanguage();
	const homeLang = lang.pages.home;

	return (
		<>
			{/* Heading */}
			<section className='flex-center h-[calc(100vh-67px)]	min-w-full'>
				<div className='container px-3'>
					<Heading />
					<p className='text-lg !leading-loose text-text_title dark:text-d_text_title md:text-xl'>
						<strong>{homeLang.subTitles[0]}</strong>
						{homeLang.subTitles[1]} <br />
						{homeLang.subTitles[2]}
					</p>
					<Link href={lang.navbarItems[1].link}>
						<button className='btn-primary md:btn-lg mt-5 flex items-center py-2 font-medium md:mt-10'>
							<PlusIcon className='mr-2 w-5' />
							<span className='capitalize'>{homeLang.buttons.createPoll}</span>
						</button>
					</Link>
				</div>
			</section>

			{/* Introduction */}
			<section className='container'>
				<div className='mb-28 grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
					<div className='col-span-1'>
						<h2 className='max-w-xl text-2xl font-medium capitalize text-text_title dark:text-d_text_title md:text-3xl'>
							{homeLang.introduction[0].title}
						</h2>
						<p className='mt-5 max-w-xl text-base font-light tracking-wider md:text-lg'>
							{homeLang.introduction[0].content}
						</p>
					</div>
					<div className='col-span-1 row-start-1 mb-4 md:col-start-2 md:mb-0'>
						<div className='max-w-96 relative h-80'>
							<Image
								src='/images/home-page/intro-1.svg'
								alt='Landing Page 1'
								objectFit='contain'
								layout='fill'
							/>
						</div>
					</div>
				</div>

				<div className='mb-28 grid grid-cols-1 items-center gap-6 md:grid-cols-2'>
					<div className='col-span-1'>
						<div className='max-w-96 relative h-80'>
							<Image
								src='/images/home-page/intro-2.png'
								alt='Landing Page 2'
								objectFit='contain'
								layout='fill'
							/>
						</div>
					</div>
					<div className='col-span-1'>
						<h2 className='max-w-xl text-2xl font-medium capitalize text-text_title dark:text-d_text_title md:text-3xl'>
							{homeLang.introduction[1].title}
						</h2>
						<p className='mt-5 max-w-xl text-base font-light tracking-wider md:text-lg'>
							{homeLang.introduction[1].content}
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
					<div className='col-span-1'>
						<h2 className='max-w-xl text-2xl font-medium capitalize text-text_title dark:text-d_text_title md:text-3xl'>
							{homeLang.introduction[2].title}
						</h2>
						<p className='mt-5 max-w-xl text-base font-light tracking-wider md:text-lg'>
							{homeLang.introduction[2].content}
						</p>
					</div>
					<div className='col-span-1 row-start-1 mb-4 md:col-start-2 md:mb-0'>
						<div className='max-w-96 relative h-80'>
							<Image
								src='/images/home-page/intro-3.png'
								alt='Landing Page 3'
								objectFit='contain'
								layout='fill'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Analytics */}
			<Analysis count={homeAnalysis.count} />

			{/* Best features */}
			<section className='mb-12'>
				<h2 className='mb-12 text-center text-3xl capitalize md:text-4xl'>
					{homeLang.featureTitle}
				</h2>
				<div className='container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{homeLang.features.map((f, index) => {
						const Icon = featureIcons[index];
						return (
							<div
								key={index}
								className='mx-auto flex max-w-sm flex-col items-center rounded-xl p-8 shadow-lg md:shadow-xl'
							>
								<Icon className='text-color-title mb-6 h-16 w-16' />
								<h5 className='mb-3 text-center text-xl capitalize md:text-2xl'>
									{f.title}
								</h5>
								<p className='text-center text-sm font-light md:text-lg'>
									{f.content}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export const getStaticProps: GetStaticProps<{
	homeAnalysis: HomeAnalysisQuery;
}> = async () => {
	try {
		const apolloClient = initializeApollo();
		const response = await apolloClient.query({
			query: HomeAnalysisDocument,
		});
		const homeAnalysis: HomeAnalysisQuery = response.data;

		addApolloState(apolloClient, { props: {} });
		return {
			props: {
				homeAnalysis,
			},
			revalidate: STATIC_PROPS_REVALIDATE.HOME_PAGE,
		};
	} catch (error) {
		console.log('Home Page GetStaticProps Error: ', error);
		return {
			props: {
				homeAnalysis: {
					count: { code: 200, comment: 0, poll: 0, tag: 0, user: 0 },
				},
			},
			revalidate: STATIC_PROPS_REVALIDATE.HOME_PAGE,
		};
	}
};

export default Home;
