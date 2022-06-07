import { Field, Int, InterfaceType } from 'type-graphql';

@InterfaceType()
abstract class MutationResponse {
	@Field(_type => Int)
	code: number;

	@Field(_type => Boolean)
	success: boolean;

	@Field(_type => String, { nullable: true })
	message?: string;
}

export default MutationResponse;
