import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CountingAggregationResponse {
	@Field()
	poll: number;

	@Field()
	user: number;

	@Field()
	hashtag: number;

	@Field()
	comment: number;
}
