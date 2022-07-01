export const LS_KEY = {
	THEME: 'theme_mode',
	USER_IP: 'ip_address',
	ACCESS_TOKEN_FOR_IOS: 'atk_ios',
};

export const GOOGLE_API_ID = process.env.NEXT_PUBLIC_GOOGLE_API_ID || '';
export const GOOGLE_RECAPTCHA_SITE_KEY =
	process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || '';

export const QUERY_KEY = {
	PAGE: 'page',
	PAGE_SIZE: 'pageSize',
	SORT: 'sort',
	FILTER: 'filter',
	SEARCH: 'search',
};

export const PRIVATE_POLL_PARAM = 'p';

export const REDIS_KEY = {
	DISCOVER: 'discover',
	TAGS: 'tags',
};

export const REDIS_KEY_TTL = {
	DISCOVER: 600,
	TAGS: 86400,
};
