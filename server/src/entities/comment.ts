import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../core/types/common';

@ObjectType()
export class CommentReply {
	@Field()
	username: string;

	@Field()
	content: string;

	@Field()
	createdAt: Date;
}

@ObjectType()
class Comment {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	content: string;

	@Field()
	createdAt: Date;

	@Field(_type => [CommentReply])
	replies: CommentReply[];
}

export default Comment;
