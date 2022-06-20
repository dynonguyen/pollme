import { Model, model, Schema } from 'mongoose';
import { DEFAULT } from '../constants/default';
import Vote from '../types/entities/Vote';
import { VOTE_TYPE } from './../constants/index';
import { MAX } from './../constants/validation';

const schema: Schema = new Schema({
	ownerId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
		maxlength: MAX.VOTE_TITLE,
	},
	slug: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		maxlength: MAX.VOTE_DESC,
		required: false,
	},
	tags: [
		{
			name: String,
			slug: String,
		},
	],
	answers: [
		{
			id: String,
			label: String,
			photo: String,
			voteList: [
				{
					userInfo: {
						userId: String,
						name: String,
						ip: String,
					},
					score: Number,
					rank: Number,
				},
			],
		},
	],
	type: {
		type: Number,
		required: true,
		default: VOTE_TYPE.SINGLE_CHOICE,
	},
	isPrivate: {
		type: Boolean,
		default: DEFAULT.VOTE.IS_PRIVATE,
	},
	isReCaptcha: {
		type: Boolean,
		default: DEFAULT.VOTE.IS_RECAPTCHA,
	},
	isIPDuplicationCheck: {
		type: Boolean,
		default: DEFAULT.VOTE.IS_IP_DUPLICATION_CHECK,
	},
	isLoginRequired: {
		type: Boolean,
		default: DEFAULT.VOTE.IS_LOGIN_REQUIRED,
	},
	isShowResult: {
		type: Boolean,
		default: DEFAULT.VOTE.SHOW_RESULT,
	},
	isShowResultBtn: {
		type: Boolean,
		default: DEFAULT.VOTE.SHOW_RESULT_BTN,
	},
	allowAddOption: {
		type: Boolean,
		default: DEFAULT.VOTE.ALLOW_ADD_OPTION,
	},
	maxVote: Number,
	maxScore: {
		type: Number,
		default: DEFAULT.VOTE.MAX_SCORE,
	},
	totalVote: {
		type: Number,
		required: true,
		default: 0,
	},
	totalComment: {
		type: Number,
		required: true,
		default: 0,
	},
	privateLink: {
		type: String,
		required: false,
	},
	endDate: Date,
	createdAt: {
		type: Date,
		default: new Date(),
	},
	updatedAt: Date,
});

const VoteModel: Model<Vote> = model('Vote', schema, 'votes');

export default VoteModel;
