import { Ctx, Query, Resolver } from 'type-graphql';
import { HashTagQueryResponse } from '../types/entities/HashTagQueryResponse';
import { ExpressContext } from './../types/core/ExpressContext';

@Resolver()
export class HashTagResolver {
	@Query(_returns => HashTagQueryResponse)
	hashtag(@Ctx() { req, res }: ExpressContext): HashTagQueryResponse {
		console.log(req);
		return {
			code: 200,
			message: 'Khộng có gì',
			hashtag: { _id: '1', name: 'Tech', catalogId: '' },
		};
	}
}
