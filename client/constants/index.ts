export const APP_NAME = 'Pollme';
export const APOLLO_SERVER_URI =
	process.env.NEXT_PUBLIC_APOLLO_SERVER_URI || '';
export const APOLLO_WS_URI = process.env.NEXT_PUBLIC_APOLLO_WS_URI || '';
export const STATIC_PROPS_REVALIDATE = {
	HOME_PAGE: 60,
};
export const TOAST_LIMIT = 3;
export const VOTE_TYPE = {
	SINGLE_CHOICE: 0,
	MULTIPLE_CHOICE: 1,
	SCORE: 2,
};
export const POLL_PHOTO_WIDTH = 800;
export const POLL_PHOTO_HEIGHT = 800;
export const POLL_PHOTO_THUMBNAIL_WIDTH = 32;
export const POLL_PHOTO_THUMBNAIL_HEIGHT = 32;
export const USER_AVT_WIDTH = 100;
export const USER_AVT_HEIGHT = 100;
export const USER_AVT_THUMBNAIL_WIDTH = 24;
export const USER_AVT_THUMBNAIL_HEIGHT = 24;
export const HOST_URI = process.env.NEXT_PUBLIC_HOST_URI;
