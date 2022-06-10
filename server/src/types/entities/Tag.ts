import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class Tag {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	name: string;

	@Field(_type => String)
	desc: string;

	@Field(_type => String)
	slug: string;

	@Field(_type => Number)
	totalVote: number;
}

export default Tag;
