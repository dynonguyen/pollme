import { ArgsType, Field, Int } from 'type-graphql';
import { DEFAULT } from '../../constants/default';

@ArgsType()
export class PaginationArgs {
	@Field(_type => Int, { nullable: true, defaultValue: 1 })
	page?: number;

	@Field(_type => Int, { nullable: true, defaultValue: DEFAULT.PAGE_SIZE })
	pageSize?: number;
}
