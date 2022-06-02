import { model, Model, Schema } from 'mongoose';
import User from '../entities/user';
import { MAX } from './../constants/validation';

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
