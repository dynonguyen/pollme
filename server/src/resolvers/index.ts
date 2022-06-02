import { NonEmptyArray } from 'type-graphql';
import { HelloResolver } from './hashtag';

const Resolvers: NonEmptyArray<Function> = [HelloResolver];

export default Resolvers;
