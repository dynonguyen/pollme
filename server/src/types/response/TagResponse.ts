import { Field, ObjectType } from 'type-graphql';
import { PaginatedResponse } from '../core/QueryResponse';
import Tag from '../entities/Tag';

@ObjectType()
export class TagPaginatedResponse extends PaginatedResponse<Tag>(Tag) {
	@Field(_type => String, { nullable: true })
	sort?: string;

	@Field(_type => String, { nullable: true })
	search?: string;
}
