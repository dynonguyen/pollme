import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { APP_NAME } from '../constants';
import { QUERY_KEY } from '../constants/key';
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
					<a className='font-medium capitalize text-gray-500 duration-300 hover:text-gray-800 dark:text-d_text_title'>
						{item.label}
					</a>
				</Link>
			))}
		</>
	);
}

function NavbarAction(): JSX.Element {
	const userInfo = useRecoilValue(userAtom);
	const isAuth = Boolean(userInfo._id);

	return <>{isAuth ? <NavbarAccountAvatar /> : <LoginRegister />}</>;
}

function MenuSlider(): JSX.Element {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className='lg:hidden'>
			<MenuIcon className={ICON_STYLES} onClick={() => setShowMenu(true)} />
			<div className={`bg-overlay ${showMenu ? '' : 'hidden'}`}>
				<div className='h-full max-w-xs bg-white p-5 dark:bg-d_bg'>
					<XIcon
						className={`ml-auto ${ICON_STYLES}`}
						onClick={() => setShowMenu(false)}
					/>
					<div className='mt-5 mb-8 flex space-x-3'>
						<NavbarAction />
					</div>
					<nav className='flex flex-col space-y-6 pl-1'>
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
	const router = useRouter();

	const handlePressEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (searchInput.current.trim()) {
				router.query[QUERY_KEY.SEARCH] = searchInput.current.trim();
			} else {
				delete router.query[QUERY_KEY.SEARCH];
			}
			router.pathname = lang.pages.discover.link;
			router.push(router);
		}
	};

	return (
		<>
			<SearchIcon className='absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 font-normal text-gray-400 dark:text-gray-500' />
			<input
				type='text'
				autoFocus
				className='field rounded-full py-1 pl-9 text-gray-700 dark:text-d_text_title'
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
				<div className='absolute top-20 left-1/2 h-8 w-4/5 -translate-x-1/2'>
					<div className='flex'>
						<SearchBar />
						<XIcon
							className='h-8 w-8 cursor-pointer text-gray-50 hover:text-gray-200 dark:text-d_text_primary'
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
		<header className='border-color sticky top-0 z-50 border-b bg-white dark:bg-d_bg'>
			<div className='flex items-center justify-between space-x-4 px-3 py-4 md:px-5 xxl:container'>
				<div className='flex items-center space-x-3 lg:space-x-0'>
					<MenuSlider />
					<Link href='/'>
						<a className='flex cursor-pointer space-x-2'>
							<img src='/images/logo.svg' alt='Logo' className='h-6 w-6' />
							<strong className='text-lg tracking-wide text-primary dark:text-d_primary'>
								{APP_NAME}
							</strong>
						</a>
					</Link>
				</div>

				<nav className='ml-2 hidden flex-grow space-x-5 lg:ml-5 lg:flex lg:space-x-8'>
					<Navbar />
				</nav>

				<div className='hidden md:items-center md:space-x-2 lg:flex'>
					<div className='relative hidden w-44 lg:w-64 xl:block'>
						<SearchBar />
					</div>
					<NavbarAction />
					<div className='mx-2 h-8 w-[1px] bg-gray-200 dark:bg-gray-600'></div>
				</div>

				<div className='flex items-center space-x-3'>
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
