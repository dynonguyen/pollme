import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { MAX } from '../constants/validation';
import UserModel from '../models/user.model';
import VoteModel from '../models/vote.model';
import User from '../types/entities/User';
import Vote from '../types/entities/Vote';
import { VotePaginationArg } from '../types/input/VoteArg';
import { VotePaginatedResponse } from '../types/response/VoteResponse';
import mongoosePaginate from '../utils/mongoose-paginate';
import { DEFAULT } from './../constants/default';
import { VoteFilterOptions } from './../constants/enum';
import { SUCCESS_CODE } from './../constants/status';
import { voteFilterToQuery } from './../utils/helper';

@Resolver(_of => Vote)
export class VoteResolver {
	@FieldResolver(_return => User, { nullable: true })
	async owner(@Root() vote: Vote): Promise<User | null> {
		if (!vote._doc?.ownerId) return null;
		return await UserModel.findById(vote._doc.ownerId);
	}

	@FieldResolver(_return => String, { nullable: true })
	shortDesc(@Root() vote: Vote): string {
		const desc = vote._doc?.desc || '';
		if (desc && desc.length > MAX.VOTE_SHORT_DESC) {
			return `${desc.slice(0, MAX.VOTE_SHORT_DESC)}...`;
		}
		return desc;
	}

	@Query(_return => VotePaginatedResponse, { nullable: true })
	async publicVotes(
		@Args()
		{
			page = 1,
			pageSize = DEFAULT.PAGE_SIZE,
			sort,
			filter = VoteFilterOptions.ALL,
		}: VotePaginationArg,
	): Promise<VotePaginatedResponse> {
		try {
			if (page < 1) page = 1;
			if (pageSize < 1) pageSize = DEFAULT.PAGE_SIZE;
			const filterQuery = voteFilterToQuery(filter);

			const votes = await mongoosePaginate(
				VoteModel,
				{ isPrivate: false, ...filterQuery },
				{ page, pageSize },
				{ sort },
			);

			return {
				code: SUCCESS_CODE.OK,
				sort,
				filter,
				...votes,
			};
		} catch (error) {
			console.error('VoteResolver - votes error: ', error);
			return {
				code: SUCCESS_CODE.OK,
				docs: [],
				sort,
				page,
				filter,
				pageSize,
				total: 0,
			};
		}
	}
}
