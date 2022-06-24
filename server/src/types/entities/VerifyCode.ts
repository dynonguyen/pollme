import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class VerifyCode {
	@Field(_type => String)
	email: string;

	@Field(_type => String)
	code: string;

	@Field(_type => Date)
	createdAt: Date;

	@Field(_type => Date)
	endDate: Date;
}

export default VerifyCode;
