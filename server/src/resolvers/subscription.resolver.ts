import { Arg, Resolver, Root, Subscription } from 'type-graphql';
import Comment from '../types/entities/Comment';
import { SUB_TOPICS } from './../constants/subscription';

@Resolver()
export class SubscriptionResolver {
	@Subscription(_return => Comment, {
		topics: SUB_TOPICS.COMMENT_ADDED,
		filter: ({
			payload,
			args,
		}: {
			payload: Comment;
			args: { voteId: string };
		}) => payload.voteId.toString() === args.voteId,
	})
	commentAdded(@Root() payload: Comment, @Arg('voteId') _: string): Comment {
		return payload;
	}
}
