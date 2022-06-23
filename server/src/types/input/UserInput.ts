import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInfoInput {
	@Field(_type => String, { nullable: true })
	name?: string;

	@Field(_type => String, { nullable: true })
	avt?: string;
}

@InputType()
export class ChangePasswordInput {
	@Field(_type => String)
	oldPwd: string;

	@Field(_type => String)
	newPwd: string;
}
