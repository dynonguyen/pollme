export const APP_NAME = 'Pollme';
export const APOLLO_SERVER_URI =
	process.env.NEXT_PUBLIC_APOLLO_SERVER_URI || '';
export const STATIC_PROPS_REVALIDATE = {
	HOME_PAGE: 60,
};
export const TOAST_LIMIT = 3;
export const VOTE_TYPE = {
	SINGLE_CHOICE: 0,
	MULTIPLE_CHOICE: 1,
	RANKED_CHOICE: 2,
	SCORE: 3,
};
export const POLL_PHOTO_WIDTH = 300;
export const POLL_PHOTO_HEIGHT = 300;
export const IP_ADDRESS_API_URI = 'https://jsonip.com';
