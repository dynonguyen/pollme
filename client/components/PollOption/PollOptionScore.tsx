import { ChangeEvent, useRef } from 'react';
import { DEFAULT } from '../../constants/default';
import { debounce } from '../../utils/helper';
import ImagePreview from '../core/ImagePreview';
import PollResultBar from './PollResultBar';

interface PollOptionScoreProps {
	title: string;
	maxScore: number;
	showResult?: boolean;
	percent?: number;
	rank?: number;
	photoUrl?: string;
	photoThumbnail?: string;
	defaultScore?: number;
	onScoreChange: (score: number) => void;
}

export default function PollOptionScore(
	props: PollOptionScoreProps,
): JSX.Element {
	const {
		title,
		maxScore = DEFAULT.VOTE.MAX_SCORE,
		showResult = true,
		defaultScore,
		percent = 0,
		rank = 0,
		photoUrl = '',
		photoThumbnail = '',
		onScoreChange,
	} = props;
	const timer = useRef<number | null>();

	const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
		timer.current = debounce(timer.current, 250, () => {
			const score = Number(e.target.value);
			if (score > maxScore) {
				e.target.value = maxScore.toString();
				onScoreChange(maxScore);
			} else if (score < 0) {
				e.target.value = '0';
				onScoreChange(0);
			} else {
				onScoreChange(score);
			}
		});
	};

	return (
		<div>
			<div className='mb-1 flex items-center space-x-2'>
				<input
					className='field w-20 flex-shrink-0 py-1 px-2'
					type='number'
					placeholder='score'
					defaultValue={defaultScore}
					max={maxScore}
					onChange={handleScoreChange}
				/>
				<strong className='text-base font-normal text-slate-500 dark:text-slate-300 md:text-xl'>
					{title}
				</strong>
				{photoUrl && <ImagePreview src={photoUrl} thumbnail={photoThumbnail} />}
			</div>

			{showResult && <PollResultBar percent={percent} rank={rank} />}
		</div>
	);
}
