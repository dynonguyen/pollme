export const MONGODB_URI = process.env.MONGODB_URI || '';
export const VOTE_TYPE = {
	DEFAULT: 0,
};
export const MONGOOSE_CONNECT_TIMEOUT = 5000; // 5s
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
export const CORS_ORIGINS: string[] = [
	process.env.CLIENT_WEB_ORIGIN || '',
	'https://studio.apollographql.com',
];
export const APP_NAME = process.env.APP_NAME || 'Pollme_Api';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'Secret';
export const __PROD__ = process.env.NODE_ENV === 'production';
