import { AuthChecker } from 'type-graphql';
import UserModel from '../models/user.model';
import { COOKIE } from './../constants/index';
import { ExpressContext } from './../types/core/ExpressContext';
import { ROLES, RoleType } from './../types/core/Role';
import { jwtAccessTokenDecode } from './../utils/jwt';

export const authChecker: AuthChecker<ExpressContext, RoleType> = async (
	{ context },
	roles,
) => {
	const accessToken: string = context.req.cookies[COOKIE.ACCESS_KEY];
	if (!accessToken) {
		return false;
	}

	const data = jwtAccessTokenDecode(accessToken);
	if (!data) {
		return false;
	}
	if (!data.user) return false;

	try {
		const user = await UserModel.findById(data.user._id);
		if (user) {
			context.res.locals.user = user;
			roles.includes(ROLES.USER);
			return true;
		}
	} catch (error) {
		return false;
	}

	return false;
};
