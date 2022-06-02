import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function PaginatedResponse<T>(TClass: ClassType<T>) {
	@ObjectType({ isAbstract: true })
	abstract class PaginatedResponseClass {
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
