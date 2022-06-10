import { Field, ID, Int, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';
import User from './User';

@ObjectType()
class VoteOfUser {
	@Field(_type => String)
	userId: string;

	@Field(_type => Int)
	score?: number;
}

@ObjectType()
export class VoteItem {
	@Field(_type => Int)
	id: number;

	@Field(_type => String)
	label: string;

	@Field(_type => String)
	desc: string;

	@Field(_type => [VoteOfUser])
	voteList: VoteOfUser[];
}

@ObjectType()
class TagInVote {
	@Field(_type => String)
	name: string;

	@Field(_type => String)
	slug: string;
}

@ObjectType()
class Vote {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	ownerId: MongoID;

	@Field(_type => String)
	title: string;

	@Field(_type => String)
	slug: string;

	@Field(_type => Int)
	type: number;

	@Field(_type => String)
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

	@Field(_type => Int)
	totalVote: number;

	@Field(_type => Int)
	totalComment: number;

	// Mongoose fields for field resolver (can't access itself directly)
	_doc?: Vote;

	// Fields need to resolve
	@Field(_type => User, { nullable: true })
	owner?: User;

	@Field(_type => String, { nullable: true })
	shortDesc?: string;
}

export default Vote;
