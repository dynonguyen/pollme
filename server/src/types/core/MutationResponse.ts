import { Field, Int, InterfaceType } from 'type-graphql';

@InterfaceType()
abstract class MutationResponse {
	@Field(_type => Int, { defaultValue: 200 })
	code: number = 200;

	@Field({ defaultValue: true })
	success: boolean = true;

	@Field({ nullable: true })
	message?: string;
}

export default MutationResponse;
