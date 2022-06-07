import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
	@Field(_type => String)
	email: string;

	@Field(_type => String)
	password: string;
}
