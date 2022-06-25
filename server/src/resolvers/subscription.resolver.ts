import { Arg, Resolver, Root, Subscription } from 'type-graphql';
import Comment from '../types/entities/Comment';
import { VotingPayload } from '../types/subscription/Vote';
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

	@Subscription(_return => VotingPayload, {
		topics: SUB_TOPICS.VOTING,
		filter: ({
			payload,
			args,
		}: {
			payload: VotingPayload;
			args: { voteId: string };
		}) => payload.voteId.toString() === args.voteId,
	})
	voted(
		@Root() payload: VotingPayload,
		@Arg('voteId') _: string,
	): VotingPayload {
		return payload;
	}
}
