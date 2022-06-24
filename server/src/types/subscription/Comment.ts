import { Field, ObjectType } from 'type-graphql';
import { MongoID } from './../commons';

@ObjectType()
export class CommentAddedPayload {
	@Field(_type => String)
	_id: MongoID;

	@Field(_type => String)
	voteId: string;

	@Field(_type => String)
	username: string;

	@Field(_type => String, { nullable: true })
	userAvt?: string;

	@Field(_type => String)
	content: string;

	@Field(_type => Date)
	createdAt: Date;
}
