import { ArgsType, Field } from 'type-graphql';
import { DEFAULT } from '../../constants/default';
import { PaginationArgs } from './PaginationArg';

@ArgsType()
export class VotePaginationArg extends PaginationArgs {
	@Field(_type => String, {
		nullable: true,
		defaultValue: DEFAULT.VOTE_SORT_FIELD,
	})
	sort?: string;

	@Field(_type => String, { nullable: true })
	filter?: string;
}
