import React from 'react';
import { DEFAULT } from '../constants/default';

export default function NavbarAccountAvatar(): JSX.Element {
	const userAvt = DEFAULT.USER_AVT;

	return (
		<>
			<img src={userAvt} className='w-10 h-10 cursor-pointer' alt='Username' />
		</>
	);
}
