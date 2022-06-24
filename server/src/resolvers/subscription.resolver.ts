import { Arg, Resolver, Root, Subscription } from 'type-graphql';
import Comment from '../types/entities/Comment';
import { SUB_TOPICS } from './../constants/subscription';
import { CommentAddedPayload } from './../types/subscription/Comment';

@Resolver()
export class SubscriptionResolver {
	@Subscription(_return => CommentAddedPayload, {
		topics: SUB_TOPICS.COMMENT_ADDED,
		filter: ({
			payload,
			args,
		}: {
			payload: Comment;
			args: { voteId: string };
		}) => payload.voteId.toString() === args.voteId,
	})
	commentAdded(
		@Root() payload: CommentAddedPayload,
		@Arg('voteId') _: string,
	): CommentAddedPayload {
		return payload;
	}
}
