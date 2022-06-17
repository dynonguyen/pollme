import { useRecoilValue } from 'recoil';
import themeAtom from '../../recoil/atoms/theme.atom';
import ImagePreview from '../core/ImagePreview';

const rankingColors = [
	'#219ebc',
	'#ca3031',
	'#00b18e',
	'#00c7c1',
	'#097fd9',
	'#6958df',
	'#f3c26a',
	'#e0418d',
	'#f17d2f',
	'#9fa9ba',
];
const darkRankingColors = [
	'#50b8d5',
	'#f57076',
	'#53e6bb',
	'#7be3e3',
	'#6fb1f5',
	'#9b95f3',
	'#f5e1a0',
	'#f374a1',
	'#f29041',
	'#c9d0d7',
];

interface PollOptionCheckboxProps {
	title: string;
	showResult?: boolean;
	percent?: number;
	rank?: number;
	photoUrl?: string;
	photoThumbnail?: string;
	onChange?: (score: number) => void;
}

export default function PollOptionScore(
	props: PollOptionCheckboxProps,
): JSX.Element {
	const {
		title,
		showResult = true,
		percent = 0,
		rank = 0,
		photoUrl = '',
		photoThumbnail = '',
		onChange,
	} = props;

	const { isDark } = useRecoilValue(themeAtom);

	const percentBarColor = rank
		? isDark
			? darkRankingColors[(rank % darkRankingColors.length) - 1]
			: rankingColors[(rank % rankingColors.length) - 1]
		: isDark
		? '#50b8d5'
		: '#219ebc';

	return (
		<div>
			<div className='flex items-center gap-2 mb-1'>
				<input
					className='field w-24 flex-shrink-0'
					placeholder='Score'
					type='number'
					onChange={e => onChange && onChange(Number(e.target.value))}
				/>
				<strong className='text-base md:text-xl text-slate-500 dark:text-slate-300 font-normal'>
					{title}
				</strong>
				{photoUrl && <ImagePreview src={photoUrl} thumbnail={photoThumbnail} />}
			</div>

			{showResult && (
				<div className='flex gap-2 items-center'>
					<div className='w-full h-2 md:h-3 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden relative'>
						<div
							className='absolute left-0 top-0 h-full rounded-full'
							style={{ width: `${percent}%`, backgroundColor: percentBarColor }}
						></div>
					</div>
					<span className='w-12 flex-shrink-0 text-slate-500 dark:text-slate-300'>
						{percent}%
					</span>
				</div>
			)}
		</div>
	);
}
