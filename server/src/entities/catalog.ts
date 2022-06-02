import { Field, ID, Int, ObjectType } from 'type-graphql';
import { MongoID } from '../core/types/common';

@ObjectType()
class Catalog {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	name!: string;

	@Field(_type => Int)
	voteTotal!: number;
}

export default Catalog;
