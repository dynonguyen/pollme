import React from 'react';
import SmallLoading from '../SmallLoading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	size?: 'medium' | 'large';
	variant?: 'primary' | 'outline' | 'accent';
}

export default function Button(props: ButtonProps) {
	const {
		className,
		size = 'medium',
		variant = 'primary',
		loading,
		children,
		...rest
	} = props;

	const btnClass = `btn flex-center btn-${variant} ${
		size === 'medium' ? '' : 'btn-lg'
	} ${className} ${loading ? 'disabled' : ''}`;

	return (
		<button className={btnClass} {...rest}>
			<div>{children}</div>
			{loading && <SmallLoading className='ml-2' />}
		</button>
	);
}
