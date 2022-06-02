import { Field, ObjectType } from 'type-graphql';
import HashTag from '../../entities/hashtag';
import { QueryResponse } from '../core/QueryResponse';

@ObjectType({ implements: QueryResponse })
export class HashTagQueryResponse extends QueryResponse {
	@Field(_type => HashTag)
	hashtag: HashTag;
}
