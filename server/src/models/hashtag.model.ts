import { Model, model, Schema } from 'mongoose';
import HashTag from '../entities/hashtag';
import { MAX } from './../constants/validation';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: MAX.HASHTAG_NAME,
	},
	catalogId: {
		type: Schema.Types.ObjectId,
		ref: 'Catalog',
		required: false,
		default: null,
	},
});

const HashTagModel: Model<HashTag> = model('HashTag', schema, 'hashtags');

export default HashTagModel;
