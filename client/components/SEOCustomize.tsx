import Head from 'next/head';
import { useRouter } from 'next/router';
import { APP_NAME } from '../constants';
import useLanguage from '../hooks/useLanguage';

interface PageSEO {
	title: string;
	pathname: string;
	desc: string;
	[key: string]: any;
}

export default function SEOCustomize() {
	const { pathname, locale } = useRouter();
	const lang = useLanguage();
	const pageSEO: { [key: string]: PageSEO } = lang.pageSEO;

	let SEO: PageSEO = { pathname, title: APP_NAME, desc: APP_NAME };
	for (let page in pageSEO) {
		if (pageSEO[page].pathname === pathname) SEO = pageSEO[page];
	}

	const pageTitle = `${SEO?.title} | ${APP_NAME}`;
	const pageDesc = SEO.desc;

	return (
		<Head>
			<title>{pageTitle}</title>
			<meta name='description' content={pageDesc} />
			<meta httpEquiv='content-language' content={locale} />
			<meta charSet='UTF-8' />
			<meta
				name='robots'
				content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
			/>
			<meta property='og:locale' content={locale} />
			<meta property='og:title' content={pageTitle} />
			<meta property='og:type' content='article' />
			<meta property='article:tag' content={APP_NAME} />
			<meta property='og:description' content={pageDesc} />
			<meta property='og:image:secure_url' content='/images/og-thumbnail.png' />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />
			<meta property='og:image:alt' content={pageTitle} />
			<meta
				httpEquiv='Content-Security-Policy'
				content='upgrade-insecure-requests'
			/>
		</Head>
	);
}
