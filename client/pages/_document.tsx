import { Head, Html, Main, NextScript } from 'next/document';
import { APP_NAME } from '../constants';

export default function Document() {
	return (
		<Html className='scroll-smooth'>
			<Head>
				<title>{APP_NAME}</title>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
