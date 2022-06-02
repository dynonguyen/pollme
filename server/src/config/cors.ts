import { CorsOptions } from 'apollo-server-express';
import { CORS_ORIGINS } from './../constants/index';

const corsConfig: CorsOptions = {
	allowedHeaders: '*',
	origin: CORS_ORIGINS,
};

export default corsConfig;
