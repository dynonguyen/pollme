import { useEffect, useState } from 'react';
import ImagePreview from '../core/ImagePreview';
import PollResultBar from './PollResultBar';

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

	const handleChecked = () => {
		onCheck && onCheck(!isChecked);
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (checked !== isChecked) setIsChecked(checked);
	}, [checked]);

	const checkedClass = isChecked ? 'bg-primary' : 'border border-color';
	const checkboxType = rounded ? 'rounded-full' : 'rounded-sm';

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

			{showResult && <PollResultBar percent={percent} rank={rank} />}
		</div>
	);
}
