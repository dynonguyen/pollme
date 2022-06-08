import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
	@Field(_type => String)
	email: string;

	@Field(_type => String)
	password: string;
}

@InputType()
export class OAuthLoginInput {
	@Field(_type => String)
	email: string;

	@Field(_type => String)
	oauthId: string;

	@Field(_type => String)
	name: string;

	@Field(_type => String)
	avt: string;
}
