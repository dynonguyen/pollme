import jwt from 'jsonwebtoken';
import { APP_NAME, JWT } from './../constants/index';

export const jwtEncode = (data: any): string => {
	return jwt.sign({ payload: data }, JWT.SECRET_KEY, {
		issuer: APP_NAME,
		expiresIn: JWT.MAX_AGE,
	});
};

export const jwtDecode = (token: string = '') => {
	try {
		return jwt.verify(token, JWT.SECRET_KEY);
	} catch (error) {
		return null;
	}
};
