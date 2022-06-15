import React from 'react';
import useGetMe from '../hooks/useGetMe';
import useGetTheme from '../hooks/useGetTheme';

export default function InitialWrapper(props: {
	children: JSX.Element | React.ReactNode;
}): JSX.Element {
	useGetMe();
	useGetTheme();

	return <>{props.children}</>;
}
