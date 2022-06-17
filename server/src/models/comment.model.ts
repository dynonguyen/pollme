import { Model, model, Schema } from 'mongoose';
import Comment from '../types/entities/Comment';
import { MAX } from './../constants/validation';

const schema: Schema = new Schema({
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	voteId: {
		type: Schema.Types.ObjectId,
		ref: 'Vote',
	},
	content: {
		type: String,
		required: true,
		maxlength: MAX.COMMENT_LENGTH,
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
	favorites: [String],
});

const CommentModel: Model<Comment> = model('Comment', schema, 'comments');

export default CommentModel;
