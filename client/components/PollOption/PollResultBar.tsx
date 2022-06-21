import { useRecoilValue } from 'recoil';
import { DARK_RANKING_COLOR, RANKING_COLOR } from '../../constants/color';
import themeAtom from '../../recoil/atoms/theme.atom';

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
			? DARK_RANKING_COLOR[(rank % DARK_RANKING_COLOR.length) - 1]
			: RANKING_COLOR[(rank % RANKING_COLOR.length) - 1]
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
