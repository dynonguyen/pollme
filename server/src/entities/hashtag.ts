import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../core/types/common';

@ObjectType()
class HashTag {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	name!: string;

	@Field(_type => String, { nullable: true })
	catalogId?: MongoID;
}

export default HashTag;
