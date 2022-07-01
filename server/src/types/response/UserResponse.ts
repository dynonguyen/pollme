import { Field, ObjectType } from 'type-graphql';
import MutationResponse from '../core/MutationResponse';
import User from '../entities/User';

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse extends MutationResponse {
	@Field(_type => User, { nullable: true })
	user?: User;

	@Field(_type => String, { nullable: true })
	accessToken?: string;
}
