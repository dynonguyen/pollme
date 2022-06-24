import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useState } from 'react';

interface PasswordInputProps {
	label: string;
	id: string;
	onChange: (value: string) => void;
}

export default function PasswordInput(props: PasswordInputProps): JSX.Element {
	const { id, label, onChange } = props;
	const [showPwd, setShowPwd] = useState(false);

	const Icon = showPwd ? EyeIcon : EyeOffIcon;

	return (
		<div>
			<label
				htmlFor={id}
				className='mb-1 ml-1 inline-block font-medium text-gray-500 dark:text-gray-300'
			>
				{label}
			</label>
			<div className='relative'>
				<input
					id={id}
					className='field'
					type={showPwd ? 'text' : 'password'}
					onChange={e => onChange(e.target.value.trim())}
					placeholder={label}
				/>
				<Icon
					className='absolute right-2 top-1/2 w-4 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300'
					onClick={() => setShowPwd(!showPwd)}
				/>
			</div>
		</div>
	);
}
