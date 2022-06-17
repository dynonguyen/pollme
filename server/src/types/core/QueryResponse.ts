import { ClassType, Field, Int, InterfaceType, ObjectType } from 'type-graphql';
import { DEFAULT } from '../../constants/default';

@InterfaceType()
export abstract class QueryResponse {
	@Field(_type => Int)
	code: number;

	@Field({ nullable: true })
	message?: string;
}

export function PaginatedResponse<T>(TClass: ClassType<T>) {
	@ObjectType({ isAbstract: true, implements: QueryResponse })
	abstract class PaginatedResponseClass extends QueryResponse {
		@Field(_type => [TClass])
		docs: T[];

		@Field(_type => Int)
		page: number;

		@Field(_type => Int)
		total: number;

		@Field(_type => Int)
		pageSize: number;
	}
	return PaginatedResponseClass;
}

export const paginatedResponseDefault = {
	docs: [],
	page: 1,
	total: 0,
	pageSize: DEFAULT.PAGE_SIZE,
};
