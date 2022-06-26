import { useState } from 'react';
import InfoTooltip from '../InfoTooltip';

interface CheckboxSwitchProps {
	rootClassName?: string;
	label?: string | React.ReactNode;
	labelClassName?: string;
	inputProps?: React.HTMLProps<HTMLInputElement>;
	size?: 'small' | 'medium';
	defaultChecked?: boolean;
	helper?: string;
	onChecked?: (checked: boolean) => void;
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
		helper,
		onChecked,
	} = props;
	const [checked, setChecked] = useState(defaultChecked);

	const handleChecked = () => {
		onChecked && onChecked(!checked);
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
			className={`flex flex-wrap items-center justify-between space-x-2 ${rootClassName}`}
		>
			{label && (
				<div className={helper ? 'flex items-center space-x-1' : ''}>
					<label className={labelClassName} onClick={handleChecked}>
						{label}
					</label>
					{helper && <InfoTooltip title={helper} />}
				</div>
			)}
			<input
				type='checkbox'
				className='hidden'
				onChange={() => {}}
				checked={checked}
				{...inputProps}
			/>
			<div className={`${switchSize} ${switchBg} relative rounded-full`}>
				<div
					className={`absolute top-[2px] cursor-pointer rounded-full bg-white ${switchBtnSize} ${switchPosition}`}
					onClick={handleChecked}
				></div>
			</div>
		</div>
	);
}
