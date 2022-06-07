import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface InputFieldRegisterProps {
	register: UseFormRegister<any>;
	name: string;
	label: string;
	placeholder?: string;
	type?: string;
	error?: string;
	rootClassName?: string;
	endIcon?: JSX.Element;
}

export function PasswordFieldRegister(props: InputFieldRegisterProps) {
	const [showPwd, setShowPwd] = useState(false);

	let EndIcon = null;
	if (showPwd) EndIcon = EyeIcon;
	else EndIcon = EyeOffIcon;

	return (
		<InputFieldRegister
			{...props}
			type={showPwd ? 'text' : 'password'}
			endIcon={
				<EndIcon
					className='cursor-pointer'
					onClick={() => setShowPwd(!showPwd)}
				/>
			}
		/>
	);
}

export default function InputFieldRegister(
	props: InputFieldRegisterProps,
): JSX.Element {
	const {
		register,
		name,
		placeholder = '',
		type = 'text',
		error,
		label,
		rootClassName = '',
		endIcon,
	} = props;

	return (
		<div className={rootClassName}>
			<label
				className='text-gray-500 font-medium mb-1 inline-block ml-1 dark:text-gray-300'
				htmlFor={name}
			>
				{label}
			</label>
			<div className='relative'>
				<input
					className={`field pr-7 ${error ? 'field-error' : ''}`}
					id={name}
					type={type}
					placeholder={placeholder}
					{...register(name)}
				/>
				{endIcon && (
					<div className='absolute w-4 top-1/2 -translate-y-1/2 right-2 text-gray-500'>
						{endIcon}
					</div>
				)}
			</div>
			{error && <p className='error-text mt-1 ml-1'>{error}</p>}
		</div>
	);
}
