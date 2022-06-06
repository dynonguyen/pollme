import { useRouter } from 'next/router';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

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
			<Header />
			<main>{props.children}</main>
			<Footer />
		</>
	);
}
