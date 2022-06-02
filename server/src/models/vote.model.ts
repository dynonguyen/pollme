import { Model, model, Schema } from 'mongoose';
import Vote from '../core/interface/vote';
import { DEFAULT } from './../constants/default';
import { VOTE_TYPE } from './../constants/index';
import { MAX } from './../constants/validation';

const schema: Schema = new Schema({
	title: {
		type: String,
		required: true,
		maxlength: MAX.VOTE_TITLE,
	},
	type: {
		type: Number,
		required: true,
		default: VOTE_TYPE.DEFAULT,
	},
	desc: {
		type: String,
		maxlength: MAX.VOTE_DESC,
	},
	isPrivate: {
		type: Boolean,
		required: true,
		default: DEFAULT.VOTE_IS_PRIVATE,
	},
	hashtag: [String],
	catalogId: {
		type: Schema.Types.ObjectId,
		ref: 'Catalog',
	},
	items: [
		{
			id: Number,
			label: String,
			desc: String,
			voteList: [
				{
					userId: String,
					score: Number,
				},
			],
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	updatedAt: Date,
	endDate: Date,
	isLoginRequired: {
		type: Boolean,
		default: DEFAULT.VOTE_IS_LOGIN_REQUIRED,
	},
	allowAddItem: {
		type: Boolean,
		default: DEFAULT.VOTE_ALLOW_ADD_ITEM,
	},
	allowChooseMultiple: {
		type: Boolean,
		default: DEFAULT.VOTE_ALLOW_CHOOSE_MULTIPLE,
	},
	allowMark: {
		type: Boolean,
		default: DEFAULT.VOTE_ALLOW_MARK,
	},
	maxVote: {
		type: Number,
		default: DEFAULT.VOTE_MAX_VOTE,
	},
	maxScore: {
		type: Number,
		default: DEFAULT.VOTE_MAX_SCORE,
	},
});

const VoteModel: Model<Vote> = model('Vote', schema, 'votes');

export default VoteModel;
