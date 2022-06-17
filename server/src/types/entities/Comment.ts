import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';
import User from './User';

@ObjectType()
export class Comment {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	ownerId: string;

	@Field(_type => String)
	voteId: string;

	@Field(_type => String)
	content: string;

	@Field(_type => Date)
	createdAt: Date;

	@Field(_type => [String])
	favorites: string[];

	@Field(_type => User, { nullable: true })
	owner?: User;

	// Mongoose fields for field resolver (can't access itself directly)
	_doc?: Comment;
}

export default Comment;
