import { Model, model, Schema } from 'mongoose';
import { MAX } from '../constants/validation';
import Tag from '../types/entities/Tag';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: MAX.TAG_NAME,
	},
	desc: {
		type: String,
		required: false,
		default: '',
	},
	slug: {
		type: String,
		required: true,
	},
	totalPoll: {
		type: Number,
		required: true,
		default: 0,
	},
});

const TagModel: Model<Tag> = model('Tag', schema, 'tags');

export default TagModel;
