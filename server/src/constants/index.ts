export const __PROD__ = process.env.NODE_ENV === 'production';
export const APP_NAME = process.env.APP_NAME || 'Pollme_Api';
export const CORS_ORIGINS: string[] = [
	process.env.CLIENT_WEB_ORIGIN || '',
	'https://studio.apollographql.com',
];
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const MONGOOSE_CONNECT_TIMEOUT = 5000; // 5s
export const SALT_PASSWORD = process.env.SALT_PASSWORD
	? Number(process.env.SALT_PASSWORD)
	: 10;
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET || 'Secret';
export const VOTE_TYPE = {
	SINGLE_CHOICE: 0,
	MULTIPLE_CHOICE: 1,
	SCORE: 2,
};
export const COOKIE = {
	ACCESS_MAX_AGE: 3 * 24 * 3600_000, // 3 days
	ACCESS_KEY: 'access_token',
};
export const JWT = {
	SECRET_KEY: process.env.JWT_SECRET_KEY || 'Secret',
	MAX_AGE: 3 * 24 * 3600,
};
