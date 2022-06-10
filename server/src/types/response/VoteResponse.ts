import { Field, ObjectType } from 'type-graphql';
import { PaginatedResponse } from '../core/QueryResponse';
import Vote from '../entities/Vote';

@ObjectType()
export class VotePaginatedResponse extends PaginatedResponse<Vote>(Vote) {
	@Field(_type => String, { nullable: true })
	sort?: string;
}
