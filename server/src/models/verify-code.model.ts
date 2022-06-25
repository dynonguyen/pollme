import { Model, model, Schema } from 'mongoose';
import VerifyCode from '../types/entities/VerifyCode';

const schema: Schema = new Schema({
	email: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
	endDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
});

const VerifyCodeModel: Model<VerifyCode> = model<VerifyCode>(
	'VerifyCode',
	schema,
	'verifyCode',
);

export default VerifyCodeModel;
