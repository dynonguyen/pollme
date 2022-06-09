import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { APP_NAME } from '../constants';
import { UserInfoFragment } from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import userAtom from '../recoil/atoms/user.atom';
import LanguageSelect from './LanguageSelect';
import NavbarAccountAvatar from './NavbarAccountAvatar';
import ThemeModeButton from './ThemeModeButton';

const ICON_STYLES =
	'w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-d_text_title dark:hover:text-gray-400 cursor-pointer';

function LoginRegister(): JSX.Element {
	const lang = useLanguage();

	return (
		<>
			<Link href={lang.pages.login.link}>
				<a>
					<button className='btn-outline rounded-full font-medium text-gray-600'>
						{lang.button.login}
					</button>
				</a>
			</Link>
			<Link href={lang.pages.register.link}>
				<a>
					<button className='btn-primary rounded-full font-medium'>
						{lang.button.register}
					</button>
				</a>
			</Link>
		</>
	);
}

function Navbar(): JSX.Element {
	const lang = useLanguage();
	return (
		<>
			{lang.navbarItems.map((item, index) => (
				<Link href={item.link} key={index}>
					<a className='font-medium capitalize text-gray-500 dark:text-d_text_title hover:text-gray-800 duration-300'>
						{item.label}
					</a>
				</Link>
			))}
		</>
	);
}

function NavbarAction(): JSX.Element {
	const userInfo = useRecoilValue<UserInfoFragment>(userAtom);
	const isAuth = Boolean(userInfo._id);

	return <>{isAuth ? <NavbarAccountAvatar /> : <LoginRegister />}</>;
}

function MenuSlider(): JSX.Element {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className='lg:hidden'>
			<MenuIcon className={ICON_STYLES} onClick={() => setShowMenu(true)} />
			<div className={`bg-overlay ${showMenu ? '' : 'hidden'}`}>
				<div className='bg-white dark:bg-d_bg p-5 max-w-xs h-full'>
					<XIcon
						className={`ml-auto ${ICON_STYLES}`}
						onClick={() => setShowMenu(false)}
					/>
					<div className='flex gap-3 mt-5 mb-8'>
						<NavbarAction />
					</div>
					<nav className='gap-6 flex flex-col pl-1'>
						<Navbar />
					</nav>
				</div>
			</div>
		</div>
	);
}

function SearchBar(): JSX.Element {
	const searchInput = useRef<string>('');
	const lang = useLanguage();

	const handlePressEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && searchInput.current.trim()) {
			// TODO: handle search
			console.log(searchInput.current);
		}
	};

	return (
		<>
			<SearchIcon className='w-5 h-5 absolute top-1/2 left-2 text-gray-400 dark:text-gray-500 font-normal -translate-y-1/2' />
			<input
				type='text'
				autoFocus
				className='field pl-9 py-1 rounded-full text-gray-700 dark:text-d_text_title'
				placeholder={lang.placeholder.search}
				onChange={e => (searchInput.current = e.target.value)}
				onKeyDown={handlePressEnter}
			/>
		</>
	);
}

function MobileSearch(): JSX.Element {
	const [showSearch, setShowSearch] = useState(false);

	return (
		<div className='xl:hidden'>
			<SearchIcon className={ICON_STYLES} onClick={() => setShowSearch(true)} />
			<div className={`${showSearch ? 'bg-overlay' : 'hidden'}`}>
				<div className='absolute w-4/5 h-8 top-20 left-1/2 -translate-x-1/2'>
					<div className='flex'>
						<SearchBar />
						<XIcon
							className='w-8 h-8 text-gray-50 hover:text-gray-200 cursor-pointer dark:text-d_text_primary'
							onClick={() => setShowSearch(false)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Header(): JSX.Element {
	return (
		<header className='border-b border-gray-200 dark:border-gray-600 sticky top-0 z-50 bg-white dark:bg-d_bg'>
			<div className='px-3 md:px-5 py-4 flex items-center justify-between gap-2 xxl:container'>
				<div className='flex items-center gap-3'>
					<MenuSlider />
					<Link href='/'>
						<a className='flex gap-2 cursor-pointer'>
							<img src='/images/logo.svg' alt='Logo' className='w-6 h-6' />
							<strong className='text-lg text-primary dark:text-d_primary tracking-wide'>
								{APP_NAME}
							</strong>
						</a>
					</Link>
				</div>

				<nav className='hidden lg:flex gap-5 lg:gap-8 flex-grow ml-2 lg:ml-5'>
					<Navbar />
				</nav>

				<div className='hidden lg:flex md:gap-2 md:items-center'>
					<div className='hidden xl:block w-44 lg:w-56 relative'>
						<SearchBar />
					</div>
					<NavbarAction />
					<div className='bg-gray-200 dark:bg-gray-600 w-[1px] mx-2 h-8'></div>
				</div>

				<div className='flex items-center gap-3'>
					<MobileSearch />
					<div className='flex-shrink-0'>
						<ThemeModeButton />
					</div>
					<LanguageSelect />
				</div>
			</div>
		</header>
	);
}
