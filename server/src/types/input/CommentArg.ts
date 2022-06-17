import { ArgsType, Field } from 'type-graphql';
import { PaginationArgs } from './PaginationArg';

@ArgsType()
export class CommentPaginationArg extends PaginationArgs {
	@Field(_type => String)
	voteId: string;
}
