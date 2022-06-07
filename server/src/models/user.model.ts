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
	password: {
		type: String,
		required: false,
	},
	oauthId: {
		type: String,
		required: false,
	},
	voted: {
		type: [Schema.Types.ObjectId],
		ref: 'Vote',
	},
	votes: {
		type: [Schema.Types.ObjectId],
		ref: 'Vote',
	},
	favorites: {
		type: [Schema.Types.ObjectId],
		ref: 'Vote',
	},
});

const UserModel: Model<User> = model('User', schema, 'users');

export default UserModel;
