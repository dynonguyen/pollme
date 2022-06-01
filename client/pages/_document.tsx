import { Head, Html, Main, NextScript } from 'next/document';
import { APP_NAME } from '../constants';
import { DEFAULT } from '../constants/default';

export default function Document() {
	return (
		<Html lang={DEFAULT.LANGUAGE}>
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
