import Head from 'next/head';
import { useRouter } from 'next/router';
import { APP_NAME, HOST_URI } from '../constants';
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
		if (page !== '/') {
			if (pathname.includes(pageSEO[page].pathname)) SEO = pageSEO[page];
		}
	}

	const pageTitle = SEO.title ? `${SEO.title} | ${APP_NAME}` : APP_NAME;
	const pageDesc = SEO.desc || lang.others.commonDesc;

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
			<meta property='og:description' content={pageDesc} />
			<meta property='og:type' content='website' />
			<meta property='article:tag' content={APP_NAME} />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />
			<meta property='og:url' content={HOST_URI} />
			<meta property='og:image:alt' content={pageTitle} />
			<meta
				property='og:image'
				content='https://res.cloudinary.com/dynonary/image/upload/w_1200,h_630/v1656490408/pollme/pollme_cover.jpg'
			/>
		</Head>
	);
}
