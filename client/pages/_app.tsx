import type { AppProps } from 'next/app';
import Head from 'next/head';
import { APP_NAME } from '../constants';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
