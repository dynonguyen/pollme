import { Model, model, Schema } from 'mongoose';
import { MAX } from './../constants/validation';
import Comment from './../core/interface/comment';

const schema: Schema = new Schema({
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
	replies: [
		{
			username: String,
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
		},
	],
});

const CommentModel: Model<Comment> = model('Comment', schema, 'comments');

export default CommentModel;
