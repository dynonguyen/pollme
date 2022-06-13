import { Field, ID, InputType, Int } from 'type-graphql';

@InputType()
class AnswerItem {
	@Field(_type => ID)
	id: number;

	@Field(_type => String)
	label: string;

	@Field(_type => String, { nullable: true })
	photo: string;
}

@InputType()
export class NewVoteInput {
	@Field(_type => String)
	title: string;

	@Field(_type => String)
	desc: string;

	@Field(_type => [String])
	tags: string[];

	@Field(_type => [AnswerItem])
	answers: AnswerItem[];

	@Field(_type => Int)
	type: number;

	@Field(_type => Boolean)
	isPrivate: boolean;

	@Field(_type => Boolean)
	isReCaptcha: boolean;

	@Field(_type => Boolean)
	isIPDuplicationCheck: boolean;

	@Field(_type => Boolean)
	isLoginRequired: boolean;

	@Field(_type => Boolean)
	isShowResult: boolean;

	@Field(_type => Boolean)
	isShowResultBtn: boolean;

	@Field(_type => Boolean)
	allowAddOption: boolean;

	@Field(_type => Int, { nullable: true })
	maxVote?: number;

	@Field(_type => Int, { nullable: true })
	maxChoice?: number;

	@Field(_type => Int, { nullable: true })
	maxScore?: number;

	@Field(_type => Date, { nullable: true })
	endDate?: Date;
}
