import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { TOAST_LIMIT } from '../constants';
import Footer from './Footer';
import Header from './Header';
import SEOCustomize from './SEOCustomize';

interface LayoutProps {
	children?: JSX.Element | React.ReactNode;
}

const withoutLayoutPaths: string[] = [];

export default function Layout(props: LayoutProps): JSX.Element {
	const { pathname } = useRouter();

	if (withoutLayoutPaths.findIndex(p => pathname === p) !== -1)
		return <>{props.children}</>;

	return (
		<>
			<SEOCustomize />
			<ToastContainer newestOnTop limit={TOAST_LIMIT} />
			<NextNProgress
				height={4}
				color='#219ebc'
				stopDelayMs={200}
				showOnShallow={true}
				options={{ showSpinner: false }}
			/>
			<Header />
			<main className='min-h-[calc(100vh-67px)]'>{props.children}</main>
			<Footer />
		</>
	);
}
