import { COOKIE } from '../constants';
import User from '../types/entities/User';
import { ExpressContext } from './../types/core/ExpressContext';
import { jwtAccessTokenEncode } from './jwt';

export const onLoginSuccess = ({ res }: ExpressContext, user: User) => {
	const { _id, name, avt, email } = user;
	const accessToken = jwtAccessTokenEncode({
		_id,
		name,
		avt,
		email,
	});
	res.cookie(COOKIE.ACCESS_KEY, accessToken, {
		maxAge: COOKIE.ACCESS_MAX_AGE,
		httpOnly: true,
	});
};
