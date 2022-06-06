import { CorsOptions } from 'apollo-server-express';
import { CORS_ORIGINS } from './../constants/index';

const corsConfig: CorsOptions = {
	origin: CORS_ORIGINS,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

export default corsConfig;
