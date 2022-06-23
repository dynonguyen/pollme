import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInfoInput {
	@Field(_type => String, { nullable: true })
	name?: string;

	@Field(_type => String, { nullable: true })
	avt?: string;
}
