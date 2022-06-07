import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import UserModel from '../models/user.model';
import { COOKIE, SALT_PASSWORD } from './../constants/index';
import { ERROR_CODE, SUCCESS_CODE } from './../constants/status';
import { ExpressContext } from './../types/core/ExpressContext';
import { LoginInput } from './../types/input/LoginInput';
import { RegisterInput } from './../types/input/RegisterInput';
import { UserMutationResponse } from './../types/response/UserResponse';
import { jwtEncode } from './../utils/jwt';

@Resolver()
export class UserResolver {
	@Mutation(_return => UserMutationResponse)
	async register(
		@Arg('registerInput') { email, name, password }: RegisterInput,
	): Promise<UserMutationResponse> {
		try {
			const existingUser = await UserModel.findOne({ email });
			if (existingUser) {
				return {
					code: ERROR_CODE.BAD_REQUEST,
					success: false,
					message: 'Email already exists !',
				};
			}

			const hashedPassword = await bcrypt.hash(password, SALT_PASSWORD);
			const newUser = await UserModel.create({
				email,
				name,
				password: hashedPassword,
			});

			return { user: newUser, code: SUCCESS_CODE.CREATED, success: true };
		} catch (error) {
			console.log('USER_RESOLVER - REGISTER MUTATION FAILED:', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				success: false,
				message: 'Registration failed',
			};
		}
	}

	@Mutation(_return => UserMutationResponse)
	async login(
		@Arg('loginInput') { email, password }: LoginInput,
		@Ctx() { res }: ExpressContext,
	): Promise<UserMutationResponse> {
		try {
			const existingUser = await UserModel.findOne({ email });
			if (!existingUser) {
				return {
					code: ERROR_CODE.NOT_FOUND,
					success: false,
					message: 'Account does not exist !',
				};
			}

			const { password: hashPwd } = existingUser;
			const isPwdCorrect = await bcrypt.compare(password, hashPwd as string);

			if (!isPwdCorrect) {
				return {
					code: ERROR_CODE.UNAUTHORIZED,
					success: false,
					message: 'Wrong password !',
				};
			}

			const accessToken = jwtEncode(existingUser._id);
			res.cookie(COOKIE.ACCESS_KEY, accessToken, {
				maxAge: COOKIE.ACCESS_MAX_AGE,
				httpOnly: true,
			});

			return {
				code: SUCCESS_CODE.OK,
				success: true,
				user: existingUser,
			};
		} catch (error) {
			console.log('USER_RESOLVER - LOGIN MUTATION FAILED:', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				success: false,
				message: 'Login failed',
			};
		}
	}
}
