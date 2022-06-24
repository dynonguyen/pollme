import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { APP_NAME, SALT_PASSWORD } from '../constants';
import UserModel from '../models/user.model';
import VerifyCodeModel from '../models/verify-code.model';
import { ForgotPwdSendMailInput } from '../types/input/VerifyInput';
import { sendMail } from '../utils/mailer';
import { ERROR_CODE, SUCCESS_CODE } from './../constants/status';
import { VERIFY_CODE_EXP, VERIFY_CODE_LEN } from './../constants/validation';
import { MutationResponseImpl } from './../types/core/MutationResponse';
import { ChangePwdByCodeInput } from './../types/input/VerifyInput';
import { randomString } from './../utils/helper';
import {
	forgotPasswordEnLang,
	forgotPasswordViLang,
} from './../utils/mail-template';
import { isEmail } from './../utils/validation';

@Resolver()
export class VerifyResolver {
	@Mutation(_return => MutationResponseImpl)
	async forgotPwdSendMail(
		@Arg('sendMailInput') { email, lang }: ForgotPwdSendMailInput,
	): Promise<MutationResponseImpl> {
		try {
			if (!email || !isEmail(email)) {
				throw new Error('Invalid Email');
			}

			const existingUser = await UserModel.findOne({ email });
			if (!existingUser) {
				return { code: ERROR_CODE.NOT_FOUND, success: false };
			}

			const verifyCode = randomString(VERIFY_CODE_LEN);
			const mailBodyHtml =
				lang === 'en'
					? forgotPasswordEnLang(verifyCode)
					: forgotPasswordViLang(verifyCode);

			const mailInfo = await sendMail({
				to: email,
				subject: `${APP_NAME} | Forgot your password`,
				html: mailBodyHtml,
			});

			if (mailInfo.messageId) {
				await VerifyCodeModel.deleteOne({ email });

				const createdAt = new Date();
				const endDate = new Date(
					createdAt.getTime() + VERIFY_CODE_EXP * 60 * 1000,
				);
				await VerifyCodeModel.create({
					code: verifyCode,
					email,
					createdAt,
					endDate,
				});
			}

			return { code: SUCCESS_CODE.OK, success: true };
		} catch (error) {
			console.error('FORGOT PASSWORD SEND MAIL ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}

	@Mutation(_return => MutationResponseImpl)
	async changePwdByVerifyCode(
		@Arg('changePwdInput')
		{ email, verifyCode, password }: ChangePwdByCodeInput,
	): Promise<MutationResponseImpl> {
		try {
			const verify = await VerifyCodeModel.findOne({
				email,
				code: verifyCode,
				endDate: { $gte: new Date() },
			});
			if (!verify) {
				return {
					code: ERROR_CODE.UNAUTHORIZED,
					success: false,
					message: 'Invalid verify code',
				};
			}

			const hashPwd = await bcrypt.hash(password, SALT_PASSWORD);
			VerifyCodeModel.deleteOne({ email });
			await UserModel.updateOne({ email }, { $set: { password: hashPwd } });

			return { code: SUCCESS_CODE.OK, success: true };
		} catch (error) {
			console.error('CHANGE PASSWORD BY VERIFY CODE ERROR: ', error);
			return { code: ERROR_CODE.INTERNAL_ERROR, success: false };
		}
	}
}
