import { useEffect, useState } from 'react';
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
	rounded?: boolean;
	defaultChecked?: boolean;
	percent?: number;
	rank?: number;
	onCheck?: (checked: boolean) => void;
	checked?: boolean;
	photoUrl?: string;
	photoThumbnail?: string;
}

export default function PollOptionCheckbox(
	props: PollOptionCheckboxProps,
): JSX.Element {
	const {
		title,
		showResult = true,
		rounded = false,
		defaultChecked = false,
		percent = 0,
		rank = 0,
		checked = defaultChecked,
		photoUrl = '',
		photoThumbnail = '',
		onCheck,
	} = props;

	const [isChecked, setIsChecked] = useState(defaultChecked);
	const { isDark } = useRecoilValue(themeAtom);

	const handleChecked = () => {
		onCheck && onCheck(!isChecked);
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (checked !== isChecked) setIsChecked(checked);
	}, [checked]);

	const checkedClass = isChecked ? 'bg-primary' : 'border border-color';
	const checkboxType = rounded ? 'rounded-full' : 'rounded-sm';
	const percentBarColor = rank
		? isDark
			? darkRankingColors[(rank % darkRankingColors.length) - 1]
			: rankingColors[(rank % rankingColors.length) - 1]
		: isDark
		? '#50b8d5'
		: '#219ebc';

	return (
		<div>
			<input
				type='checkbox'
				className='hidden'
				checked={checked}
				onChange={() => {}}
			/>
			<div className='flex items-center gap-2 mb-1'>
				<div
					className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 cursor-pointer ${checkedClass} ${checkboxType}`}
					onClick={handleChecked}
				></div>
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
