import React, { useEffect, useState } from 'react';
import useGetMe from '../hooks/useGetMe';
import useGetTheme from '../hooks/useGetTheme';
import GlobalLoading from './GlobalLoading';

export default function InitialWrapper(props: {
	children: JSX.Element | React.ReactNode;
}): JSX.Element {
	const getMeLoading = useGetMe();
	const getThemeLoading = useGetTheme();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!getMeLoading && !getThemeLoading) {
			setLoading(false);
		}
	}, [getMeLoading, getThemeLoading]);

	return <>{loading ? <GlobalLoading /> : props.children}</>;
}
