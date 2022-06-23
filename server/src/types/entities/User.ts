import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class User {
	@Field(_type => ID)
	_id: MongoID;

	@Field(_type => String)
	name: string;

	@Field(_type => String)
	email: string;

	@Field(_type => String, { nullable: true })
	avt?: string;

	password?: string;

	@Field(_type => String, { nullable: true })
	oauthId?: string;

	@Field(_type => Date)
	createdAt: Date;

	// Mongoose fields for field resolver (can't access itself directly)
	_doc?: User;
}

export type CoreUserInfo = Pick<
	Partial<User>,
	'_id' | 'email' | 'name' | 'avt' | 'createdAt'
>;

export default User;
