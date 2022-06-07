import React from 'react';
import useGetMe from '../hooks/useGetMe';

export default function InitialWrapper(props: {
	children: JSX.Element | React.ReactNode;
}): JSX.Element {
	useGetMe();
	return <>{props.children}</>;
}
