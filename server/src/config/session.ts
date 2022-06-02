import { SessionOptions } from 'express-session';
import { DEFAULT } from '../constants/default';
import { APP_NAME } from './../../../client/constants/index';
import { SESSION_SECRET, __PROD__ } from './../constants/index';

const sessionConfig: SessionOptions = {
	name: APP_NAME,
	secret: SESSION_SECRET,
	cookie: {
		httpOnly: true,
		maxAge: DEFAULT.MAX_AGE_SESSION,
		secure: __PROD__,
		sameSite: 'lax',
	},
};

export default sessionConfig;
