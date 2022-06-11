import { NonEmptyArray } from 'type-graphql';
import { AggregationResolver } from './aggregation.resolver';
import { TagResolver } from './tag.resolver';
import { UserResolver } from './user.resolver';
import { VoteResolver } from './vote.resolver';

const Resolvers: NonEmptyArray<Function> = [
	AggregationResolver,
	UserResolver,
	VoteResolver,
	TagResolver,
];

export default Resolvers;
