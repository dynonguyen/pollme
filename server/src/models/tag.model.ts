import { Model, model, Schema } from 'mongoose';
import { MAX } from '../constants/validation';
import Tag from '../types/entities/Tag';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: MAX.TAG_NAME,
	},
	viDesc: {
		type: String,
		required: false,
		default: '',
	},
	enDesc: {
		type: String,
		required: false,
		default: '',
	},
	slug: {
		type: String,
		required: true,
	},
	totalVote: {
		type: Number,
		required: true,
		default: 0,
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
});

const TagModel: Model<Tag> = model('Tag', schema, 'tags');

export default TagModel;
