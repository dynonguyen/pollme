import { Field, InputType } from 'type-graphql';

@InputType()
export class FavoriteCommentInput {
	@Field(_type => String)
	userId: string;

	@Field(_type => String)
	commentId: string;
}
