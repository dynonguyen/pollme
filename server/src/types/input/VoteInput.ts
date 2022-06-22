import { Field, Float, InputType, Int } from 'type-graphql';
import { AnswerItem } from './NewVoteInput';

@InputType()
class VoteInput {
	@Field(_type => String)
	id: string;

	@Field(_type => Float, { nullable: true, defaultValue: null })
	score: number;
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

@InputType()
export class AddAnswerInput {
	@Field(_type => String)
	voteId: string;

	@Field(_type => AnswerItem)
	answer: AnswerItem;
}

@InputType()
export class UpdateVoteInput {
	@Field(_type => String)
	voteId: string;

	@Field(_type => Boolean)
	isPrivate: boolean;

	@Field(_type => Boolean)
	allowAddOption: boolean;

	@Field(_type => Boolean)
	isIPDuplicationCheck: boolean;

	@Field(_type => Boolean)
	isLoginRequired: boolean;

	@Field(_type => Boolean)
	isReCaptcha: boolean;

	@Field(_type => Boolean)
	isShowResult: boolean;

	@Field(_type => Boolean)
	isShowResultBtn: boolean;

	@Field(_type => Boolean, { defaultValue: false })
	refreshLink: boolean;

	@Field(_type => String, { nullable: true })
	endDate: string | Date;

	@Field(_type => Int, { nullable: true })
	maxVote: number;
}
