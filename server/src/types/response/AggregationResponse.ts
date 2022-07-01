import { Field, Int, ObjectType } from 'type-graphql';
import { QueryResponse } from '../core/QueryResponse';

@ObjectType({ implements: QueryResponse })
export class CountingAggregation extends QueryResponse {
	@Field(_type => Int)
	poll: number;

	@Field(_type => Int)
	user: number;

	@Field(_type => Int)
	tag: number;

	@Field(_type => Int)
	voted: number;
}
