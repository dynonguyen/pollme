import { useState } from 'react';

interface CheckboxSwitchProps {
	rootClassName?: string;
	label?: string | React.ReactNode;
	labelClassName?: string;
	inputProps?: React.HTMLProps<HTMLInputElement>;
	size?: 'small' | 'medium';
	defaultChecked?: boolean;
}

export default function CheckboxSwitch(
	props: CheckboxSwitchProps,
): JSX.Element {
	const {
		inputProps = {},
		label,
		rootClassName = '',
		size = 'small',
		defaultChecked = false,
		labelClassName,
	} = props;
	const [checked, setChecked] = useState(defaultChecked);

	const onChecked = () => {
		setChecked(!checked);
	};

	const switchBg = checked
		? 'bg-primary dark:bg-d_primary'
		: 'bg-gray-300 dark:bg-gray-500';
	const switchPosition = checked ? 'right-[2px]' : 'left-[2px]';
	const switchSize = size === 'small' ? 'w-12 h-6' : 'w-14 h-7';
	const switchBtnSize = size === 'small' ? 'w-5 h-5' : 'w-6 h-6';

	return (
		<div
			className={`flex flex-wrap gap-2 items-center justify-between ${rootClassName}`}
		>
			{label && (
				<label className={labelClassName} onClick={onChecked}>
					{label}
				</label>
			)}
			<input
				type='checkbox'
				className='hidden'
				onChange={() => {}}
				checked={checked}
				{...inputProps}
			/>
			<div className={`${switchSize} ${switchBg} rounded-full relative`}>
				<div
					className={`absolute bg-white top-[2px] rounded-full cursor-pointer ${switchBtnSize} ${switchPosition}`}
					onClick={onChecked}
				></div>
			</div>
		</div>
	);
}
