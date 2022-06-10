import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import UserModel from '../models/user.model';
import VoteModel from '../models/vote.model';
import User from '../types/entities/User';
import Vote from '../types/entities/Vote';
import { VotePaginatedResponse } from '../types/response/VoteResponse';
import mongoosePaginate from '../utils/mongoose-paginate';
import { DEFAULT } from './../constants/default';
import { SUCCESS_CODE } from './../constants/status';
import { PaginationArgs } from './../types/input/PaginationArg';

@Resolver(_of => Vote)
export class VoteResolver {
	@FieldResolver(_return => User, { nullable: true })
	async owner(@Root() vote: Vote): Promise<User | null> {
		if (vote._doc?.owner) return null;
		return await UserModel.findById(vote._doc?.ownerId);
	}

	@Query(_return => VotePaginatedResponse, { nullable: true })
	async publicVotes(
		@Args() { page = 1, pageSize = DEFAULT.PAGE_SIZE, sort }: PaginationArgs,
	): Promise<VotePaginatedResponse> {
		try {
			if (page < 1) page = 1;
			if (pageSize < 1) pageSize = DEFAULT.PAGE_SIZE;

			const votes = await mongoosePaginate(
				VoteModel,
				{ isPrivate: false },
				{ page, pageSize },
				{ sort },
			);

			return {
				code: SUCCESS_CODE.OK,
				sort,
				...votes,
			};
		} catch (error) {
			console.error('VoteResolver - votes error: ', error);
			return {
				code: SUCCESS_CODE.OK,
				docs: [],
				sort,
				page,
				pageSize,
				total: 0,
			};
		}
	}
}
