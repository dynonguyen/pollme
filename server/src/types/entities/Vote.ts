import { Field, ID, Int, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class VoteOfUser {
	@Field()
	userId: string;

	@Field()
	score?: number;
}

@ObjectType()
export class VoteItem {
	@Field()
	id: number;

	@Field()
	label: string;

	@Field()
	desc: string;

	@Field(_type => [VoteOfUser])
	voteList: VoteOfUser[];
}

@ObjectType()
class Vote {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	title!: string;

	@Field(_type => Int)
	type: number;

	@Field()
	desc?: string;

	@Field()
	isPrivate: boolean;

	@Field()
	hashtag: string[];

	@Field()
	catalogId: string;

	@Field()
	items: VoteItem[];

	@Field()
	createdAt: Date;

	@Field()
	updatedAt?: Date;

	@Field({ nullable: true })
	endDate?: Date;

	@Field()
	isLoginRequired: boolean;

	@Field()
	allowAddItem: boolean;

	@Field()
	allowChooseMultiple: boolean;

	@Field()
	allowMark: boolean;

	@Field(_type => Int)
	maxVote: number;

	@Field(_type => Int, { nullable: true })
	maxScore?: boolean;
}

export default Vote;
