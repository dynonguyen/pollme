import { Field, ID, ObjectType } from 'type-graphql';
import { MongoID } from '../commons';

@ObjectType()
class User {
	@Field(_type => ID)
	_id: MongoID;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	avt?: string;

	password?: string;

	@Field({ nullable: true })
	oauthId?: string;

	@Field(_type => [String])
	voted: MongoID[];

	@Field(_type => [String])
	votes: MongoID[];

	@Field(_type => [String])
	favorites: MongoID[];
}

export type CoreUserInfo = Pick<
	Partial<User>,
	'_id' | 'email' | 'name' | 'avt'
>;

export default User;