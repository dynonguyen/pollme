import { ArgsType, Field } from 'type-graphql';
import { DEFAULT } from '../../constants/default';
import { PaginationArgs } from './PaginationArg';

@ArgsType()
export class TagPaginationArg extends PaginationArgs {
	@Field(_type => String, {
		nullable: true,
		defaultValue: DEFAULT.TAG_SORT_FIELD,
	})
	sort?: string;

	@Field(_type => String, { nullable: true })
	search?: string;
}
