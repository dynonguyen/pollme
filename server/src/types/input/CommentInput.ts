import { Field, InputType } from 'type-graphql';

@InputType()
export class FavoriteCommentInput {
	@Field(_type => String)
	userId: string;

	@Field(_type => String)
	commentId: string;
}

@InputType()
export class AddCommentInput {
	@Field(_type => String)
	voteId: string;

	@Field(_type => String)
	ownerId: string;

	@Field(_type => String)
	content: string;
}
