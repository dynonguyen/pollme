import { model, Model, Schema } from 'mongoose';
import { MAX } from '../constants/validation';
import User from '../types/entities/User';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: MAX.USER_NAME,
	},
	email: {
		type: String,
		required: true,
		maxlength: MAX.USER_EMAIL,
	},
	avt: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: false,
	},
	oauthId: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const UserModel: Model<User> = model<User>('User', schema, 'users');

export default UserModel;
