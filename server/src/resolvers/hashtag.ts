import { Arg, Query, Resolver } from 'type-graphql';
import HashTag from '../entities/hashtag';

@Resolver()
export class HelloResolver {
	@Query(_returns => HashTag)
	hashtag(@Arg('id') id: string): HashTag {
		return { _id: id, name: '', catalogId: '' };
	}
}
