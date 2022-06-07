import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import UserModel from '../models/user.model';
import { SALT_PASSWORD } from './../constants/index';
import { ERROR_CODE, SUCCESS_CODE } from './../constants/status';
import { RegisterInput } from './../types/input/RegisterInput';
import { UserMutationResponse } from './../types/response/UserResponse';

@Resolver()
export class UserResolver {
	@Mutation(_return => UserMutationResponse)
	async register(
		@Arg('fields') { email, name, password }: RegisterInput,
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
}
