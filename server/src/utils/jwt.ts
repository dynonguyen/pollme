import jwt from 'jsonwebtoken';
import { APP_NAME, JWT } from './../constants/index';
import { CoreUserInfo } from './../types/entities/User';

type AccessDecode = (jwt.JwtPayload & { user?: CoreUserInfo }) | null;

export const jwtEncode = (data: any): string => {
	return jwt.sign(data, JWT.SECRET_KEY, {
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

export const jwtAccessTokenEncode = (userInfo: CoreUserInfo) =>
	jwtEncode({ user: userInfo });

export const jwtAccessTokenDecode = (token: string = ''): AccessDecode => {
	try {
		return jwt.verify(token, JWT.SECRET_KEY) as AccessDecode;
	} catch (error) {
		return null;
	}
};
