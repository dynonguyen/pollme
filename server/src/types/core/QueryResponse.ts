import { ClassType, Field, Int, InterfaceType, ObjectType } from 'type-graphql';
import PaginatedResponse from './PaginatedResponse';

@InterfaceType()
export abstract class QueryResponse {
	@Field(_type => Int)
	code: number;

	@Field({ nullable: true })
	message?: string;
}

export function QueryPaginationResponse<T>(TClass: ClassType<T>) {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType({ isAbstract: true, implements: QueryResponse })
	abstract class QueryPaginationResponseClass
		extends PaginatedResponse(TClass)
		implements QueryResponse
	{
		code: number;
		message?: string;
	}
	return QueryPaginationResponseClass;
}
