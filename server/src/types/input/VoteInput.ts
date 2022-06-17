import { Field, Float, InputType } from 'type-graphql';

@InputType()
class VoteInput {
	@Field(_type => String)
	id: string;

	@Field(_type => Float, { nullable: true, defaultValue: null })
	score: number;

	@Field(_type => Float, { nullable: true, defaultValue: null })
	rank: number;
}

@InputType()
class UserInfoInput {
	@Field(_type => String, { nullable: true })
	userId: string;

	@Field(_type => String, { nullable: true })
	userIp: string;

	@Field(_type => String, { defaultValue: '' })
	username: string;
}

@InputType()
export class VotingInput {
	@Field(_type => String)
	pollId: string;

	@Field(_type => UserInfoInput)
	userInfo: UserInfoInput;

	@Field(_type => [VoteInput], { defaultValue: [] })
	votes: VoteInput[];

	@Field(_type => [String], { defaultValue: [] })
	unVoteIds: string[];
}
