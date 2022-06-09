import Link from 'next/link';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DEFAULT } from '../constants/default';
import {
	useLogoutMutation,
	UserInfoFragment,
} from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import userAtom, { userAtomDefault } from '../recoil/atoms/user.atom';

export default function NavbarAccountAvatar(): JSX.Element {
	const userInfo = useRecoilValue<UserInfoFragment>(userAtom);
	const userAvt = userInfo.avt ? userInfo.avt : DEFAULT.USER_AVT;
	const lang = useLanguage();
	const { accountMenu } = lang;
	const [logoutMutation] = useLogoutMutation();
	const toast = useToast();
	const setUserInfoAtom = useSetRecoilState(userAtom);

	const onLogout = async () => {
		const response = await logoutMutation();
		if (response.data) {
			toast.show({ message: lang.messages.logoutSuccess, type: 'success' });
			setUserInfoAtom(userAtomDefault);
		}
	};

	return (
		<div className='relative inline-block group'>
			<img
				src={userAvt}
				className='w-10 h-10 cursor-pointer rounded-full'
				alt='Username'
			/>
			<div className='menu w-56 left-0 md:right-0 md:left-auto'>
				<ul>
					{accountMenu.map((item, index) => (
						<Link href={item.to} key={index}>
							<a className='menu-item'>
								<li>{item.title}</li>
							</a>
						</Link>
					))}
					<li className='menu-item' onClick={onLogout}>
						{lang.button.logout}
					</li>
				</ul>
			</div>
		</div>
	);
}
