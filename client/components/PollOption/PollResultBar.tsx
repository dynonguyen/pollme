import { useRecoilValue } from 'recoil';
import themeAtom from '../../recoil/atoms/theme.atom';

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

export default function PollResultBar({
	rank,
	percent,
}: {
	percent: number;
	rank: number;
}) {
	const { isDark } = useRecoilValue(themeAtom);

	const percentBarColor = rank
		? isDark
			? darkRankingColors[(rank % darkRankingColors.length) - 1]
			: rankingColors[(rank % rankingColors.length) - 1]
		: isDark
		? '#50b8d5'
		: '#219ebc';

	return (
		<div className='flex gap-2 items-center'>
			<div className='w-full h-2 md:h-3 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden relative'>
				<div
					className='absolute left-0 top-0 h-full rounded-full'
					style={{ width: `${percent}%`, backgroundColor: percentBarColor }}
				></div>
			</div>
			<span className='w-10 flex-shrink-0 text-slate-500 dark:text-slate-300 text-right'>
				{percent}%
			</span>
		</div>
	);
}
