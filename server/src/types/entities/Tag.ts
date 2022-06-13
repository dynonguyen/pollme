import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class Tag {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	name: string;

	@Field(_type => String)
	viDesc: string;

	@Field(_type => String)
	enDesc: string;

	@Field(_type => String)
	slug: string;

	@Field(_type => Number)
	totalVote: number;

	@Field(_type => Date)
	createdAt: Date;
}

export default Tag;
