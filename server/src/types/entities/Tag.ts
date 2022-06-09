import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class Tag {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	name: string;

	@Field()
	desc: string;

	@Field()
	slug: string;

	@Field()
	totalPoll: number;
}

export default Tag;
