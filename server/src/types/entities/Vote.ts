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
class TagInVote {
	@Field()
	name: string;

	@Field()
	slug: string;
}

@ObjectType()
class Vote {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	title: string;

	@Field(_type => String)
	slug: string;

	@Field(_type => Int)
	type: number;

	@Field()
	desc?: string;

	@Field(_type => Boolean)
	isPrivate: boolean;

	@Field(_type => [TagInVote])
	tags: TagInVote[];

	@Field(_type => [VoteItem])
	items: VoteItem[];

	@Field(_type => Date)
	createdAt: Date;

	@Field(_type => Date)
	updatedAt?: Date;

	@Field({ nullable: true })
	endDate?: Date;

	@Field(_type => Boolean)
	isLoginRequired: boolean;

	@Field(_type => Boolean)
	allowAddItem: boolean;

	@Field(_type => Boolean)
	allowChooseMultiple: boolean;

	@Field(_type => Boolean)
	allowMark: boolean;

	@Field(_type => Int)
	maxVote: number;

	@Field(_type => Int, { nullable: true })
	maxScore?: boolean;
}

export default Vote;
