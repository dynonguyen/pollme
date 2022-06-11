import { Args, Query, Resolver } from 'type-graphql';
import { DEFAULT } from '../constants/default';
import TagModel from '../models/tag.model';
import { TagPaginationArg } from '../types/input/TagArg';
import { TagPaginatedResponse } from '../types/response/TagResponse';
import mongoosePaginate from '../utils/mongoose-paginate';
import { SUCCESS_CODE } from './../constants/status';

@Resolver()
export class TagResolver {
	@Query(_return => TagPaginatedResponse)
	async tags(
		@Args()
		{ page = 1, pageSize = DEFAULT.PAGE_SIZE, sort, search }: TagPaginationArg,
	) {
		try {
			if (page < 1) page = 1;
			if (pageSize < 1) pageSize = DEFAULT.PAGE_SIZE;
			const searchQuery = search ? { name: { $regex: search } } : {};

			const tags = await mongoosePaginate(
				TagModel,
				{ ...searchQuery },
				{ page, pageSize },
				{ sort },
			);

			return {
				code: SUCCESS_CODE.OK,
				sort,
				search,
				...tags,
			};
		} catch (error) {
			console.error('VoteResolver - votes error: ', error);
			return {
				code: SUCCESS_CODE.OK,
				docs: [],
				sort,
				page,
				search,
				pageSize,
				total: 0,
			};
		}
	}
}
