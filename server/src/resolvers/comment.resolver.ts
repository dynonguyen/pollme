import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { DEFAULT } from '../constants/default';
import { ERROR_CODE, SUCCESS_CODE } from '../constants/status';
import CommentModel from '../models/comment.model';
import UserModel from '../models/user.model';
import { paginatedResponseDefault } from '../types/core/QueryResponse';
import Comment from '../types/entities/Comment';
import User from '../types/entities/User';
import mongoosePaginate from '../utils/mongoose-paginate';
import { CommentPaginationArg } from './../types/input/CommentArg';
import { CommentPaginatedResponse } from './../types/response/CommentResponse';

@Resolver(_of => Comment)
export class CommentResolver {
	@FieldResolver(_return => User, { nullable: true })
	async owner(@Root() comment: Comment): Promise<User | null> {
		if (!comment._doc?.ownerId) return null;
		return await UserModel.findById(comment._doc.ownerId);
	}

	@Query(_return => CommentPaginatedResponse)
	async comments(
		@Args()
		{ voteId, page = 1, pageSize = DEFAULT.PAGE_SIZE }: CommentPaginationArg,
	): Promise<CommentPaginatedResponse> {
		try {
			const commentDocs = await mongoosePaginate(
				CommentModel,
				{ voteId },
				{ page, pageSize },
				{ sort: '-createdAt' },
			);

			return {
				code: SUCCESS_CODE.OK,
				...commentDocs,
			};
		} catch (error) {
			console.error('COMMENT QUERY ERROR: ', error);
			return {
				code: ERROR_CODE.INTERNAL_ERROR,
				...paginatedResponseDefault,
			};
		}
	}
}
