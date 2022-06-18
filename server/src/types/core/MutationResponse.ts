import { Field, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
abstract class MutationResponse {
	@Field(_type => Int)
	code: number;

	@Field(_type => Boolean)
	success: boolean;

	@Field(_type => String, { nullable: true })
	message?: string;
}

@ObjectType({ implements: MutationResponse })
export class MutationResponseImpl extends MutationResponse {}

export default MutationResponse;
