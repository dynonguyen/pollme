import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
export class CommentReply {
	@Field(_type => String)
	username: string;

	@Field(_type => String)
	content: string;

	@Field(_type => Date)
	createdAt: Date;
}

@ObjectType()
class Comment {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	content: string;

	@Field(_type => Date)
	createdAt: Date;

	@Field(_type => [CommentReply])
	replies: CommentReply[];

	@Field(_type => [String])
	favorites: string[];

	// Mongoose fields for field resolver (can't access itself directly)
	_doc?: Comment;
}

export default Comment;
