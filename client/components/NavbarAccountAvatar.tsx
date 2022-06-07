import React from 'react';
import { useRecoilValue } from 'recoil';
import { DEFAULT } from '../constants/default';
import { UserInfoFragment } from '../graphql-client/generated/graphql';
import userAtom from '../recoil/atoms/user.atom';

export default function NavbarAccountAvatar(): JSX.Element {
	const userInfo = useRecoilValue<UserInfoFragment>(userAtom);
	const userAvt = userInfo.avt ? userInfo.avt : DEFAULT.USER_AVT;

	return (
		<>
			<img src={userAvt} className='w-10 h-10 cursor-pointer' alt='Username' />
		</>
	);
}
