import { NonEmptyArray } from 'type-graphql';
import { HashTagResolver } from './hashtag';

const Resolvers: NonEmptyArray<Function> = [HashTagResolver];

export default Resolvers;
