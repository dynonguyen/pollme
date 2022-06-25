import { Field, Int, ObjectType } from 'type-graphql';
import { VoteAnswer } from '../entities/Vote';
import { MongoID } from './../commons';

@ObjectType()
export class VotingPayload {
	voteId: MongoID;

	@Field(_type => [VoteAnswer])
	answers: VoteAnswer[];

	@Field(_type => Int)
	totalVote: number;
}
