import { NonEmptyArray } from 'type-graphql';
import { AggregationResolver } from './aggregation.resolver';
import { CommentResolver } from './comment.resolver';
import { TagResolver } from './tag.resolver';
import { UserResolver } from './user.resolver';
import { VerifyResolver } from './verify.resolver';
import { VoteResolver } from './vote.resolver';

const Resolvers: NonEmptyArray<Function> = [
	AggregationResolver,
	UserResolver,
	VoteResolver,
	TagResolver,
	CommentResolver,
	VerifyResolver,
];

export default Resolvers;
