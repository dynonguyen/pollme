import { Query, Resolver } from 'type-graphql';
import { HashTagQueryResponse } from '../types/entities/HashTagQueryResponse';

@Resolver()
export class HashTagResolver {
	@Query(_returns => HashTagQueryResponse)
	hashtag(): HashTagQueryResponse {
		return {
			code: 200,
			message: 'Khộng có gì',
			hashtag: { _id: '1', name: 'Tech', catalogId: '' },
		};
	}
}
