import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/core/ErrorBoundary';
import InitialWrapper from '../components/InitialWrapper';
import Layout from '../components/Layout';
import { useApollo } from '../lib/apolloClient';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
			<RecoilRoot>
				<InitialWrapper>
					<Layout>
						<ErrorBoundary>
							<Component {...pageProps} />
						</ErrorBoundary>
					</Layout>
				</InitialWrapper>
			</RecoilRoot>
		</ApolloProvider>
	);
}

export default MyApp;
