import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import HeadTitle from '../components/HeadTitle';
import InitialWrapper from '../components/InitialWrapper';
import Layout from '../components/Layout';
import { APP_NAME, TOAST_LIMIT } from '../constants';
import { useApollo } from '../lib/apolloClient';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
			<HeadTitle title={APP_NAME} />
			<ToastContainer newestOnTop limit={TOAST_LIMIT} />
			<RecoilRoot>
				<InitialWrapper>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</InitialWrapper>
			</RecoilRoot>
		</ApolloProvider>
	);
}

export default MyApp;
