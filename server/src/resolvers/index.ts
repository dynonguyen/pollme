import { NonEmptyArray } from 'type-graphql';
import { AggregationResolver } from './aggregation.resolver';
import { UserResolver } from './user.resolver';

const Resolvers: NonEmptyArray<Function> = [AggregationResolver, UserResolver];

export default Resolvers;
