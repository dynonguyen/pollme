import { NonEmptyArray } from 'type-graphql';
import { AggregationResolver } from './aggregation.resolver';

const Resolvers: NonEmptyArray<Function> = [AggregationResolver];

export default Resolvers;
