import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { APP_NAME } from '../constants';
import { useApollo } from '../lib/apolloClient';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
			<Head>
				<title>{APP_NAME}</title>
			</Head>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
