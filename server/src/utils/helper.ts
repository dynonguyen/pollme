import { COOKIE } from '../constants';
import User from '../types/entities/User';
import { VoteFilterOptions } from './../constants/enum';
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

export const voteFilterToQuery = (filter: string): Object => {
	switch (filter) {
		case VoteFilterOptions.ALL:
			return {};
		case VoteFilterOptions.ACTIVE:
			return { $or: [{ endDate: null }, { endDate: { $gte: new Date() } }] };
		case VoteFilterOptions.CLOSED:
			return { endDate: { $lt: new Date() } };
		case VoteFilterOptions.UNVOTE:
			return { totalVote: 0 };
		default:
			return {};
	}
};
