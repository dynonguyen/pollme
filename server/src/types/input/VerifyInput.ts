import { Field, InputType } from 'type-graphql';

@InputType()
export class ForgotPwdSendMailInput {
	@Field(_type => String)
	email: string;

	@Field(_type => String, { defaultValue: 'vi' })
	lang: string;
}

@InputType()
export class ChangePwdByCodeInput {
	@Field(_type => String)
	email: string;

	@Field(_type => String)
	verifyCode: string;

	@Field(_type => String)
	password: string;
}
