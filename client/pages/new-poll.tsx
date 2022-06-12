import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import AnswerOptions from '../components/AnswerOptions';
import CheckboxSwitch from '../components/core/CheckboxSwitch';
import Select from '../components/core/Select';
import TagInput from '../components/core/TagInput';
import { MAX } from '../constants/validation';
import useLanguage from '../hooks/useLanguage';
import userAtom from '../recoil/atoms/user.atom';

interface BasicSettings {
	title: string;
	desc: string;
	tags: string[];
	answers: Array<{
		id: number;
		label: string;
		photo?: string | ArrayBuffer | null;
	}>;
}

const classes = {
	box: 'p-4 h-max shadow-md border-t border-gray-100 dark:border-none dark:bg-d_bg_hover rounded-md',
	h2: 'text-xl text-primary dark:text-d_primary mb-4',
};

function BasicSettings({
	onCollectData,
}: {
	onCollectData?: (data: BasicSettings) => void;
}): JSX.Element {
	const fields = useRef<BasicSettings>({
		title: '',
		answers: [],
		desc: '',
		tags: [],
	});

	useEffect(() => {
		onCollectData && onCollectData(fields.current);
	}, [onCollectData]);

	return (
		<div className='grid gap-4'>
			{/* Title */}
			<div>
				<label htmlFor='title' className='new-poll-label'>
					Title
				</label>
				<input
					autoFocus
					id='title'
					type='text'
					maxLength={MAX.VOTE_TITLE}
					className='field mt-1'
					placeholder='Type your poll title here'
					onChange={e => (fields.current.title = e.target.value.trim())}
				/>
			</div>
			{/* Desc */}
			<div>
				<label htmlFor='desc' className='new-poll-label'>
					Description
				</label>
				<input
					id='desc'
					type='text'
					maxLength={MAX.VOTE_TITLE}
					className='field mt-1'
					placeholder='Type your poll description here'
					onChange={e => (fields.current.desc = e.target.value.trim())}
				/>
			</div>
			{/* Tag */}
			<div>
				<label htmlFor='tags' className='new-poll-label'>
					Tags (max {MAX.VOTE_TAG} tags)
				</label>
				<TagInput
					maxTags={MAX.VOTE_TAG}
					onChange={tags => (fields.current.tags = tags)}
				/>
			</div>
			{/* Answers */}
			<div>
				<label className='new-poll-label'>
					Answer Options (max {MAX.MAX_ANSWER_OPTIONS} options)
				</label>
				<AnswerOptions
					onCollectData={answers => (fields.current.answers = answers)}
				/>
			</div>
		</div>
	);
}

function AdvanceSettings(): JSX.Element {
	return (
		<div className='grid gap-4'>
			<div className='flex items-center gap-3'>
				<label htmlFor='pollType' className='new-poll-label w-32 shrink-0'>
					Poll Type
				</label>
				<Select
					selectProps={{ id: 'pollType' }}
					options={[{ label: 'Single Choice', value: 0 }]}
					defaultValue={0}
				/>
			</div>

			<div className='flex items-center gap-3'>
				<label className='new-poll-label w-32 shrink-0'>Max choices</label>
				<input type='number' className='field' />
			</div>

			<div className='flex items-center gap-3'>
				<label className={`new-poll-label w-32 shrink-0`}>Max score</label>
				<input type='number' className='field' />
			</div>
			<CheckboxSwitch
				label='Private (only via direct link)'
				labelClassName='new-poll-label'
				inputProps={{ name: 'isPrivate' }}
			/>
			<CheckboxSwitch
				label='reCAPTCHA'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<CheckboxSwitch
				label='IP Duplication Check'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<CheckboxSwitch
				label='Login Required'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<CheckboxSwitch
				label='Show result'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<CheckboxSwitch
				label='Allow add option'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<CheckboxSwitch
				label='Show result button'
				labelClassName='new-poll-label'
				inputProps={{ name: 'reCAPTCHA' }}
			/>
			<div className='flex items-center gap-3'>
				<label className={`new-poll-label w-32 shrink-0`}>Max vote</label>
				<input type='number' className='field' />
			</div>
			<div className='flex items-center gap-3'>
				<label className={`new-poll-label w-32 shrink-0`}>End date</label>
				<input type='date' className='field' />
			</div>
		</div>
	);
}

const NewVote: NextPage = () => {
	const userInfo = useRecoilValue(userAtom);
	const router = useRouter();
	const lang = useLanguage();
	const [isCollectData, setIsCollectData] = useState(false);
	const basicSettings = useRef<BasicSettings>();

	useEffect(() => {
		if (!userInfo.loading && !userInfo._id) {
			router.push(lang.pages.login.link);
		}
		return () => {};
	}, [userInfo]);

	useEffect(() => {
		if (isCollectData) {
			console.log(basicSettings.current);
		}
	}, [isCollectData]);

	const handleCreatePoll = () => {
		setIsCollectData(true);
	};

	return (
		<div className='container mb-5'>
			<div className='py-5 md:py-0 lg:bg-[url("/images/create-poll-bg.svg")] lg:dark:bg-[url("/images/create-poll-bg-dark.svg")] bg-no-repeat bg-right-top lg:h-32'>
				<h1 className='font-normal lg:leading-[128px] capitalize'>
					Create a new poll
				</h1>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-7 gap-5'>
				<div className={`lg:col-span-4 ${classes.box}`}>
					<h2 className={classes.h2}>Basic</h2>
					{isCollectData ? (
						<BasicSettings
							onCollectData={data => (basicSettings.current = data)}
						/>
					) : (
						<BasicSettings />
					)}
					<div className='hidden md:block text-right mt-3'>
						<button
							className='btn-primary btn-lg w-1/2'
							onClick={handleCreatePoll}
						>
							Create Poll
						</button>
					</div>
				</div>

				<div className={`lg:col-span-3 ${classes.box}`}>
					<h2 className={classes.h2}>Advance</h2>
					<AdvanceSettings />
					<div className='md:hidden text-right mt-3'>
						<button
							className='btn-primary btn-lg w-full'
							onClick={handleCreatePoll}
						>
							Create Poll
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewVote;
