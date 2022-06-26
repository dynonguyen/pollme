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
			<div className='mb-1 flex items-center space-x-2'>
				<div
					className={`h-4 w-4 flex-shrink-0 cursor-pointer md:h-5 md:w-5 ${checkedClass} ${checkboxType}`}
					onClick={handleChecked}
				></div>
				<strong className='text-base font-normal text-slate-500 dark:text-slate-300 md:text-xl'>
					{title}
				</strong>
				{photoUrl && <ImagePreview src={photoUrl} thumbnail={photoThumbnail} />}
			</div>

			{showResult && <PollResultBar percent={percent} rank={rank} />}
		</div>
	);
}
