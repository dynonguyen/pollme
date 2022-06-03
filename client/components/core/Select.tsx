import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useClickOutside';
import useLanguage from '../../hooks/useLanguage';
import { SelectOptions } from '../../types/common';

interface SelectProps {
	options: SelectOptions[];
	defaultValue?: string | number;
	className?: string;
	optionItemClass?: string;
	placeholder?: string;
	selectProps?: React.HTMLProps<HTMLSelectElement>;
	onChange?: (value: string | number, option: SelectOptions) => void;
}

export default function Select(props: SelectProps): JSX.Element {
	const lang = useLanguage();
	const {
		className = '',
		optionItemClass = '',
		placeholder = lang.placeholder.defaultSelect,
		options,
		selectProps = {},
		onChange,
		defaultValue,
	} = props;

	const ref = useRef(null);
	useOnClickOutside(ref, () => {
		setShowOptions(false);
	});

	const defaultOption = options.find(o => o.value === defaultValue) || null;
	const [option, setOption] = useState<SelectOptions | null>(defaultOption);
	const [showOptions, setShowOptions] = useState(false);

	const handleValueChange = (option: SelectOptions) => {
		setOption(option);
		onChange && onChange(option.value, option);
	};

	return (
		<div
			ref={ref}
			className={`relative field cursor-pointer rounded-lg w-full text-text_primary dark:text-d_text_primary ${className}`}
			onClick={() => setShowOptions(!showOptions)}
		>
			<select
				readOnly
				value={option?.value}
				className='hidden'
				{...selectProps}
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}></option>
				))}
			</select>

			<div className='flex items-center justify-between'>
				<div className='text-inherit'>{option?.label || placeholder}</div>
				<ChevronDownIcon className='w-4 text-gray-600 dark:text-d_text_primary' />
			</div>

			{options.length > 0 && (
				<ul
					className={`${
						showOptions ? '' : 'hidden'
					} absolute border rounded-lg py-1 top-full left-0 mt-2 min-w-full w-max max-w-md z-50 bg-white dark:bg-d_bg dark:border-gray-600 dark:text-d_text_title`}
				>
					{options.map((option, index) => (
						<li
							className={`py-1 px-4 hover:bg-gray-100 dark:hover:bg-slate-600/30 ${optionItemClass}`}
							key={index}
							onClick={() => handleValueChange(option)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
