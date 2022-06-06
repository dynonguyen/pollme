import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
	register: UseFormRegister<any>;
	name: string;
	label: string;
	placeholder?: string;
	type?: string;
	error?: string;
	rootClassName?: string;
}

export default function InputFieldRegister(
	props: InputFieldProps,
): JSX.Element {
	const {
		register,
		name,
		placeholder = '',
		type = 'text',
		error,
		label,
		rootClassName = '',
	} = props;

	return (
		<div className={rootClassName}>
			<label
				className={`text-gray-500 font-medium mb-1 inline-block ml-1 dark:text-gray-300 ${
					error ? 'error-text' : ''
				}`}
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className={`field ${error ? 'field-error' : ''}`}
				id={name}
				type={type}
				placeholder={placeholder}
				{...register(name)}
			/>
			{error && <p className='error-text mt-1 ml-1'>{error}</p>}
		</div>
	);
}
