import Head from 'next/head';
import React from 'react';
import { APP_NAME } from '../constants';

interface HeadTitleProps {
	title: string;
}

export default function HeadTitle(props: HeadTitleProps) {
	const { title = '' } = props;

	return (
		<Head>
			<title>{title ? `${APP_NAME} | ${title}` : APP_NAME}</title>
		</Head>
	);
}
